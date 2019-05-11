import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
@Component({
    selector: 'input-number',
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.scss'],
    exportAs: 'inputNumber'
})
export class InputNumberComponent  {

    @Input() min: number;
    @Input() name: string;
    @Input() max: number;
    @Input() ngModel: any;
    @Output() ngModelChange = new EventEmitter<number>(true);
    @Output() onFocus = new EventEmitter<any>();
    @Output() onBlur = new EventEmitter<any>();
    @ViewChild('input') input: ElementRef;

    constructor() {
    }

    private mouseDown: boolean = false;
    private timer: any;

    /**
     *
     * @param input
     * @param stepDirection
     */
    onMouseDown (input: HTMLInputElement, stepDirection) {
        this.mouseDown = true;
        input.classList.add('pressed');

        setTimeout(() => {
            if ( this.timer ) return;

            this.timer = setInterval(() => {
                if ( this.mouseDown )  {
                    this.step(stepDirection, input);
                } else {
                   this.resetTimer();
                }
            }, 60)
        }, 300)


    }

    onMouseUp (input: HTMLInputElement) {
        this.mouseDown = false;
        this.ngModelChange.emit(this.ngModel);
        this.resetTimer();
        input.focus();
        input.classList.remove('pressed')
    }

    onMouseLeave () {
        if ( this.mouseDown ) {
            this.resetTimer();
        }
    }

    resetTimer () {
        if ( this.timer ) {
            clearInterval(this.timer);
        }
        this.timer = null;
    }

    /**
     *
     * @param input
     * @param stepDirection
     */
    onChanged (input, stepDirection?) {
        if ( stepDirection ) {
            this.step(stepDirection, input);
        }

        this.ngModel = !input.value ? null : Number(input.value);

        this.ngModelChange.emit(this.ngModel);
    }

    /**
     *
     * @param step
     * @param input
     */
    step (step, input) {
        switch (step) {
            case 'up':
                input.stepUp();
                break;
            case 'down':
                input.stepDown();
                break;
        }
    }

    /**
     *
     * @param e
     */
    inputBlur (e) {
        this.onBlur.emit(e)
    }

    /**
     *
     * @param e
     */
    inputFocus (e) {
        this.onFocus.emit(e)
    }

}
