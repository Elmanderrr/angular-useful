import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-confirm',
    templateUrl: './confirm.component.html',
    styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit() {
    }

    public confirmMessage: any;
    public submitBtnText: any;
    public cancelBtnText: any;

}
