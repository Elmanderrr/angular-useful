import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm.component';
import { ConfirmService } from './confirm.service';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
    providers: [
        ConfirmService
    ],
    declarations: [ConfirmComponent],
    imports: [
        CommonModule,
        FormsModule,
        TranslateModule,
        InlineSVGModule
    ],
    exports: [
    ],
    entryComponents: [ ConfirmComponent ]
})
export class ConfirmModule {
}
