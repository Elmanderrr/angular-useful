import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { SortingDropdownComponent } from './sorting-dropdown.component';
import { FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { SharedModule } from '../../shared.module';

@NgModule({
    providers: [],
    imports: [
        CommonModule,
        NgbModule,
        FormsModule,
        TranslateModule.forChild(),
        InlineSVGModule,
        SharedModule
    ],
    declarations: [SortingDropdownComponent],
    exports: [SortingDropdownComponent],
})
export class SortingDropdownModule {
}
