import { Injectable } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmComponent } from './confirm.component';
import * as _ from 'underscore';

interface ConfirmModalProps extends NgbModalOptions {
    onCancel?: () => any,
    onSubmit: () => any,
    text?: { confirmMessage?: string, submitBtnText?: string, cancelBtnText?: string }
}

@Injectable()
export class ConfirmService {

    constructor(private modalService: NgbModal) {
    }

    private defaultModalProps: NgbModalOptions = {
        windowClass: 'app-confirm-modal modal-centered',
        keyboard: false,
        backdrop: 'static'
    };

    public confirm(opts: ConfirmModalProps) {
        const options:ConfirmModalProps = _.extend(
            this.defaultModalProps,
            opts
        );

        const modalRef = this.modalService.open(ConfirmComponent, options);

        _.extend(modalRef.componentInstance, opts.text || {});

        modalRef.result.then(() => {
            if ( _.isFunction(opts.onSubmit) ) {
                opts.onSubmit()
            }
        }, () => {
            if ( _.isFunction(opts.onCancel) ) {
                opts.onCancel()
            }
        })
    }

}
