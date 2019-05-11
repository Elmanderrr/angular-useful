import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteListComponent } from './autocomplete-list.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [ AutocompleteListComponent ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [ AutocompleteListComponent ]
})
export class AutocompleteListModule {
}
