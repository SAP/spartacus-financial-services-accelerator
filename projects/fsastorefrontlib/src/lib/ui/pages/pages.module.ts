import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// ContentPage
import { QuotesPageModule } from './quotes-page/quotes-page.module';
import { PoliciesPageModule } from './policies-page/policies-page.module';
import { ClaimsPageModule } from './claims-page/claims-page.module';
import { InsuranceCategoryPageModule } from './insurance-category-page/insurance-category-page.module';

const pageModules = [
    QuotesPageModule,
    PoliciesPageModule,
    ClaimsPageModule,
    InsuranceCategoryPageModule
];

@NgModule({
    imports: [CommonModule, ...pageModules],
    declarations: [],
    exports: [...pageModules]
})

export class PagesModule {
}