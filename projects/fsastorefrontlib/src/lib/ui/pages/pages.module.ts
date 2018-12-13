import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ContentPage
import { QuotesPageModule } from './quotes-page/quotes-page.module';
import { PoliciesPageModule } from './policies-page/policies-page.module';
import { ClaimsPageModule } from './claims-page/claims-page.module';
import { FSCategoryPageModule } from './fs-category-page/fs-category-page.module';

const pageModules = [
    QuotesPageModule,
    PoliciesPageModule,
    ClaimsPageModule,
    FSCategoryPageModule
];

@NgModule({
    imports: [CommonModule, ...pageModules],
    declarations: [],
    exports: [...pageModules]
})

export class PagesModule {
}