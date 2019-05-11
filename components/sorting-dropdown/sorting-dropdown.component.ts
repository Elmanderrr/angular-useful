import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from './sort.interface';

@Component({
    selector: 'app-sorting-dropdown',
    templateUrl: './sorting-dropdown.component.html',
    styleUrls: ['./sorting-dropdown.component.scss']
})
export class SortingDropdownComponent implements OnInit {

    constructor() {
    }

    @Input() sdModel: Array<Sort>;
    @Input() sdDefaultSort: Sort;
    @Output() sdOnSort = new EventEmitter<any>();

    ngOnInit() {
        if ( this.sdDefaultSort && !this.sdDefaultSort.sortDirection ) {
            this.sdDefaultSort.sortDirection = this.defaultSortDirection;
        }
    }

    private defaultSortDirection: string = 'DESC';
    private lastSort: Sort;

    /**
     *
     * @param sort
     */
    sortBy(sort: Sort) {
        if ( !this.sdDefaultSort ) {
            sort.sortDirection = this.defaultSortDirection;
        }

        if (sort._static) {

        } else {
            if ( !this.lastSort || this.lastSort.field === sort.field ) {
                sort.sortDirection = sort.sortDirection === 'DESC' ? 'ASC' : 'DESC';
            } else {
                sort.sortDirection = this.lastSort.sortDirection;
            }

        }
        this.lastSort = sort;

        this.sdOnSort.emit(sort);
    }
}
