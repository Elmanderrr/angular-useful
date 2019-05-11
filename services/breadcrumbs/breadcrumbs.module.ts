import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbsResolver } from './breadcrumbs.resolver';
import { BreadcrumbsService } from './breadcrumbs.service';

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        BreadcrumbsResolver
    ]
})
export class BreadcrumbsBuilderModule {
    constructor(private breadcrumbsService: BreadcrumbsService) {
        this.breadcrumbsService.init()
    }
}
