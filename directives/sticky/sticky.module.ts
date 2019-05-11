import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StickyDirective } from './sticky.directive';
import { StickyService } from './sticky.service';

@NgModule({
    providers: [
        StickyService
    ],
    imports: [
        CommonModule,
    ],
    declarations: [ StickyDirective ],
    exports: [ StickyDirective ]
})
export class StickyModule {
}
