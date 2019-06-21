import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  CmsPageGuard, PageLayoutModule, PageLayoutComponent } from '@spartacus/storefront';
import { RoutesConfig, RoutingConfig, ConfigModule } from '@spartacus/core';

// const routes: Routes = [
//   {
//     path: null,
//     canActivate: [CmsPageGuard],
//     component: PageLayoutComponent,
//     data: { cxRoute: 'category' }
//   },
//   {
//     path: 'Insurance-Products/:categoryTitle/c/:categoryCode',
//     redirectTo: 'category',
//     data: { cxRedirectTo: 'category' }
//   },
//   {
//     path: 'Banking-Products/:categoryTitle/c/:categoryCode',
//     redirectTo: 'category',
//     data: { cxRedirectTo: 'category' }
//   },
//   {
//     path: 'c/:categoryCode',
//     canActivate: [CmsPageGuard],
//     redirectTo: 'category',
//     data: { cxRedirectTo: 'checkout/' }
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    // RouterModule.forChild(routes),
    // ConfigModule.withConfig({
    //   routing: {
    //     routes: {
    //       category: {
    //         paths: [null],
    //         paramsMapping: { categoryCode: 'code' },
    //       }
    //     }
    //   }
    // }),
    PageLayoutModule
  ]
})
export class FSCategoryPageModule {
}
