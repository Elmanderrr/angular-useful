import {
    ChangeDetectorRef,
    Component, ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output, ViewChild
} from '@angular/core';
import { EventsService } from '../../../core/services/events.service';
import * as _ from 'underscore'

@Component({
    selector: 'autocomplete-list',
    templateUrl: './autocomplete-list.component.html',
    styleUrls: ['./autocomplete-list.component.scss']
})
export class AutocompleteListComponent implements OnInit, OnDestroy, OnChanges {

    @Output() onItemClick = new EventEmitter<any>();
    @Input() list: Array<string>;
    @Input() autoAddSingleItem: boolean = false;
    @Input() highlightedKey: any;
    @Output() highlightedKeyChange = new EventEmitter<string>(true);
    @ViewChild('autcompleteListEl') autcompleteListEl: ElementRef;

    constructor(private eventsService: EventsService, private cd: ChangeDetectorRef) {
    }

    private keyListener: any;


    ngOnInit() {
        this.keyListener = this.eventsService.on('window:keydown', (data) => {
            this.onKeyDown(data)
        });
    }

    ngOnDestroy () {
        this.keyListener.unsub()
    }

    ngOnChanges (changes: any) {
        if ( !changes.list ) return;

        if ( !_.every(changes.list.previousValue, item => changes.list.currentValue.includes(item)) ) {
            //reset old highlighted key
            this.highlightedKey = null;
        }
    }


    /**
     *
     * @param item
     */
    public onAutocompleteItemClick (item) {
        this.onItemClick.emit(item);
    }

    private onKeyDown (data: KeyboardEvent) {
        if ( !this.list || !this.list.length || this.list.includes(null)) return;

        const currentIndex = this.list.indexOf(this.highlightedKey);

        switch (data.which) {
            //down arrow
            case 40:
                if ( this.highlightedKey ) {
                    this.highlightedKey = this.list[ currentIndex + 1 ]
                } else {
                    this.highlightedKey = this.list[0]
                }

                this.highlightedKeyChange.emit(this.highlightedKey);

                break;

            //up arrow
            case 38:
                if ( this.highlightedKey ) {
                    this.highlightedKey = this.list[ currentIndex - 1 ]
                } else {
                    this.highlightedKey = this.list[this.list.length - 1]
                }

                this.highlightedKeyChange.emit(this.highlightedKey);

                break;

            //enter key
            case 13:
                if ( this.highlightedKey ) {
                    return this.onItemClick.emit(this.highlightedKey);
                }

                if ( this.list.length === 1 && this.autoAddSingleItem ) {
                    this.onItemClick.emit(this.list[0])
                }

                this.highlightedKeyChange.emit(this.highlightedKey);

                break;
        }

        this.scrollToHighlightedEl()
    }

    private findHighlightedEl (text): HTMLElement {
        return _.find(this.autcompleteListEl.nativeElement.children, (li: HTMLElement) => {
            return li.dataset['name'] === text
        })
    }

    private scrollToHighlightedEl () {
        const el = this.findHighlightedEl(this.highlightedKey);

        if ( el ) {
            el.parentElement.scrollTo(0, el.offsetTop - el.parentElement.clientHeight + el.clientHeight)
        }
    }
    
    public onHover (item) {
        this.highlightedKey = item;
        this.highlightedKeyChange.emit(this.highlightedKey);
    }

}
