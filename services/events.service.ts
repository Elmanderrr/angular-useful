import { Injectable } from '@angular/core';
import { Subject, Observable, from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class EventsService {
    public listeners: object = {};
    public eventsSubject: any;
    public events: any;

    constructor() {
        this.listeners = {};
        this.eventsSubject = new Subject();

        this.events = from(this.eventsSubject);

        this.events.subscribe(({name, args}) => {
            if (this.listeners[name]) {
                for (let listener of this.listeners[name]) {
                    listener(...args);
                }
            }
        });
    }


    on(name, listener) {
        if (!this.listeners[name]) {
            this.listeners[name] = [];
        }

        this.listeners[name].push(listener);

        return {
            unsub: () => {
                this.listeners[name].splice(this.listeners[name].indexOf(listener), 1);
            }
        }
    }

    broadcast(name, ...args) {
        this.eventsSubject.next({
            name,
            args
        });
    }
}
