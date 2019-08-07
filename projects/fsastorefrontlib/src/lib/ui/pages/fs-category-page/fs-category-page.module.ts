import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PageLayoutModule } from '@spartacus/storefront';

// const routes: Routes = [
//   {
//     path: null,
//     canActivate: [CmsPageGuard],
//     component: PageLayoutComponent,
//     data: { cxPath: 'category' }
//   },
//   {
//     path: 'Insurance-Products/:categoryTitle/c/:categoryCode',
//     redirectTo: null,
//     data: { cxRedirectTo: 'category' }
//   },
//   {
//     path: 'Banking-Products/:categoryTitle/c/:categoryCode',
//     redirectTo: null,
//     data: { cxRedirectTo: 'category' }
//   },
//   {
//     path: 'c/:categoryCode',
//     canActivate: [CmsPageGuard],
//     redirectTo: null,
//     data: { cxRedirectTo: 'checkout/' }
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    //RouterModule.forChild(routes),
    PageLayoutModule
  ]
})
export class FSCategoryPageModule {
}
