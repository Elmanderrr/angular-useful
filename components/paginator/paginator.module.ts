import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { FormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        InlineSVGModule,
        TranslateModule
    ],
    declarations: [PaginatorComponent],
    exports: [PaginatorComponent]
})
export class PaginatorModule {
}
