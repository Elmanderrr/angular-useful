import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { StickyService } from './sticky.service';
@Directive({
    selector: '[stickyOnScroll]'
})
export class StickyDirective implements AfterViewInit {

    @Input('stickyOffset') offset: number = 0;
    @Input('stickyDebounce') debounceTime: number;
    @Input('stickyUseTopPosition') fallbackToTop: boolean;
    @Output('onSticky') onSticky = new EventEmitter<any>();
    @Output('onNonSticky') onNonSticky = new EventEmitter<any>();
    @Output('onForceScroll') onForceScroll = new EventEmitter<any>();

    constructor(private _elementRef: ElementRef, private stickyService: StickyService) {}

    private topPos:number = 0;
    private onStickyCallbackWasCalled: boolean = false;
    private onNonStickyCallbackWasCalled: boolean = false;
    private id: number = Date.now();
    private hostEl: HTMLElement;

    ngOnInit () {
        this.hostEl = this._elementRef.nativeElement;
    }

    ngAfterViewInit() {
        this.stickyService.pushSub({
            id:this.id,
            callback: this.onScroll.bind(this),
            forceCallback: this.onScrollForce.bind(this),
            debounceTime: this.debounceTime
        });
    }

    ngOnDestroy () {
        this.stickyService.removeSub(this.id);
    }


    getPos () {
        return this.hostEl.getBoundingClientRect()
    }

    getDocScrollTop ():number {
        return document.documentElement.scrollTop || document.body.scrollTop
    }

    /**
     * OnScroll function will be debounce to 0.6s
     */
    onScroll () {
        if ( this.shouldBeFixed() ) {
            //reset callback counter;
            this.onNonStickyCallbackWasCalled = false;
            if ( !this.onStickyCallbackWasCalled ) {
                this.emitOnStickyCallback()
            }

            this.stick()

        } else {
            //reset callback counter;
            this.onStickyCallbackWasCalled = false;
            if ( !this.onNonStickyCallbackWasCalled ) {
                this.emitOnNonStickyCallback()
            }
            //reset top position value in case of extra margins of other elements
            this.topPos = null;
            this.unStick();
        }

        this.hostEl.classList.remove('invisible')
    }

    /**
     * forceScroll will be called without debounce to properly hide and show sticky element
     */
    private onScrollForce() {

        // save element top position once
        if (!this.topPos) {
            this.topPos = this.getPos().top + window.pageYOffset - document.documentElement.clientTop;
        }

        this.onForceScroll.emit({
            el: this.hostEl,
            shouldBeFixed: this.shouldBeFixed()
        });

    }


    private emitOnStickyCallback () {
        this.onStickyCallbackWasCalled = true;
        this.onSticky.emit()
    }

    private emitOnNonStickyCallback () {
        this.onNonStickyCallbackWasCalled = true;
        this.onNonSticky.emit()
    }

    private stick () {
        const translateY = Math.abs(window.pageYOffset - this.topPos + Number(this.offset));

        if ( !this.hostEl.classList.contains('sticky') ) {
            this.hostEl.classList.add('sticky');
        }

        this.setPosition(translateY)
    }

    private unStick () {
        if ( this.hostEl.classList.contains('sticky') ) {
            this.hostEl.classList.remove('sticky');
        }

       this.setPosition(0)
    }

    private shouldBeFixed(): boolean {
        return (this.getDocScrollTop() + Number(this.offset)) >= this.topPos
    }

    /**
     *
     * @param top
     */
    private setPosition(top: number) {
        if ( this.fallbackToTop ) {
            this.hostEl.style.top=`${top}px`;
        } else {
            this.hostEl.style.transform=`translateY(${top}px)`;
        }
    }
}
