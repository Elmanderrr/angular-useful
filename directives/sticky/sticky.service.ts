import { Injectable, NgZone } from '@angular/core';
import * as _ from 'underscore'
import { fromEvent, Observable, Subject, Subscription } from 'rxjs';
import {
    debounceTime,
    tap
} from 'rxjs/operators';

interface Sub {
    callback: () => any;
    forceCallback:  () => any;
    id: number;
    debounceTime?: any;
    timer?: Observable<any>;
    reset?: Subject<any>;
    subscription?: Subscription;
}

@Injectable({
    providedIn: 'root'
})
export class StickyService {

    constructor(private zone: NgZone) {
        this.init();
    }

    private subs: Array<Sub> = [];
    init() {
        this.zone.runOutsideAngular(() => {
            fromEvent(window, 'scroll')
                .pipe(
                    tap((e) => {
                        this.fire(true)
                    })
                )
                .subscribe(res => {
                    this.fire();
                });
        });
    }

    /**
     *
     * @param forceCall
     */
    private fire (forceCall: boolean = false) {
        this.subs.forEach((sub:Sub) => {
            if ( forceCall ) {
                sub.forceCallback()
            } else {
                if ( sub.debounceTime ) {
                    this.runAfterDelay(sub)
                } else {
                    sub.callback()
                }
            }
        })
    }

    /**
     *
     * @param sub
     */
    public pushSub (sub: Sub) {
        if ( _.isFunction(sub.callback) ) {
            if ( sub.debounceTime ) {
                _.extend(sub, {
                    reset: new Subject()
                })
            }
            this.subs.push(sub);
        } else {
            console.error(`callback is not typeof function`)
        }
    }

    /**
     *
     * @param id
     */
    public removeSub (id:number) {
        this.subs = _.filter(this.subs, sub => {
            return sub.id !== id;
        })
    }

    /**
     *
     * @param sub
     */
    private runAfterDelay(sub: Sub) {
        sub.reset.next(void 0);

        if ( !sub.subscription ) {

            sub.timer = sub.reset.pipe(
                debounceTime(sub.debounceTime)
            );

            sub.subscription = sub.timer.subscribe(() => {
                sub.callback()
            });

        }
    }

}

