import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html',
    styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

    @Input() page: number | any;
    @Input() pageSize: number;
    @Input() collectionSize: number;

    @Output() pageChange = new EventEmitter<number>(true);

    constructor() {
    }

    public maxPageNumber: number;

    ngOnInit() {
        this.maxPageNumber = Math.ceil(this.collectionSize / this.pageSize);
    }

    ngOnChanges (changes) {
        this.maxPageNumber = Math.ceil(this.collectionSize / this.pageSize);
    }
    
    public prevPage () {
        if ( this.page > 1 ) {
           -- this.page;
            this.pageChange.emit(this.page)
        }
    }
    
    public nextPage () {
        if ( this.page < this.maxPageNumber ) {
            ++ this.page;
            this.pageChange.emit(this.page)
        }
    }

    /**
     *
     * @param pageInput
     */
    public onSubmit (pageInput: HTMLElement) {
        const isNumber = /\d+/.test(this.page);

        if ( this.page > this.maxPageNumber ) {
            this.page = this.maxPageNumber;
        }

        if ( this.page <= 0 || !isNumber) {
            this.page = 1;
        }

        pageInput.blur()
        this.pageChange.emit(this.page)
    }

}
