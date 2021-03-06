import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumberComponent } from './input-number.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [InputNumberComponent],
    imports: [
        FormsModule,
        CommonModule
    ],
    exports: [ InputNumberComponent ]
})
export class InputNumberModule {
}
