import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'underscore';

@Directive({
    selector: '[fixColumnOnScroll]'
})
export class FixColumnOnScrollDirective implements AfterViewInit, OnDestroy {

    @Input() extraColsSelectors: Array<string> = [];
    @Input() fixColumnOnScroll: number = 1;

    constructor(private _elementRef: ElementRef) {
    }

    private fixedCols: Array<HTMLElement>;
    public scrollableParent: HTMLElement;
    private listener: any = this.onHorizontalScroll.bind(this);

    ngAfterViewInit () {
        this.extraColsSelectors = [
            ...this.extraColsSelectors,
            this.getFixedElSelector()
        ];

        this.addFixedClass();
        this.initListeners();

    }

    ngOnDestroy () {
        if ( !this.scrollableParent ) return;

        this.scrollableParent.removeEventListener('scroll', this.listener);
    }

    private initListeners () {
        this.scrollableParent = this.findScrollableParent();

        if ( this.scrollableParent ) {
            this.fixedCols = this._elementRef.nativeElement.querySelectorAll(this.extraColsSelectors.join(','));

            this.scrollableParent.addEventListener('scroll', this.listener);
        }

    }
    
    private findScrollableParent () {
        let parent:HTMLElement = this._elementRef.nativeElement.parentElement;
        
        while ( parent.parentElement && !this.checkIfScrollable(parent) ) {
            parent = parent.parentElement;
        }

        return this.checkIfScrollable(parent) ? parent : null;
    }

    /**
     *
     * @param el
     */
    private checkIfScrollable (el: HTMLElement) {
        return el.scrollWidth > el.offsetWidth
    }

    /**
     *
     * @param e
     */
    private onHorizontalScroll (e) {
        _.each(this.fixedCols, this.stickColumn.bind(this))
    }

    /**
     *
     * @param col
     */
    public stickColumn (col:HTMLElement) {
        if ( !this.scrollableParent ) return;

        col.style.transform = `translateX(${this.scrollableParent.scrollLeft}px)`;
    }

    public forceStick () {
        setTimeout(() => {
            this.fixedCols = this._elementRef.nativeElement.querySelectorAll(this.extraColsSelectors.join(','));
            _.each(this.fixedCols, this.stickColumn.bind(this))
        }, 100)
    }

    private getFixedElSelector () {
        return `tr th:nth-child(-n+${this.fixColumnOnScroll}), tr td:nth-child(-n+${this.fixColumnOnScroll})`
    }

    private addFixedClass () {
        _.each(this._elementRef.nativeElement.querySelectorAll(this.getFixedElSelector()), (el:any) => {
            el.classList.add('fixed-col')
        })
    }
}
