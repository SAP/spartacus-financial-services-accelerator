import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuard, LayoutConfig, PageLayoutComponent } from '@spartacus/storefront';
import { ConfigModule, CmsConfig, RoutesConfig, RoutingConfig } from '@spartacus/core';
import { CheckoutPageComponent } from './checkout-page.component';
import { CheckoutPageLayoutModule } from '../../layout/checkout-page-layout/checkout-page-layout.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard],
    data: { cxRoute: 'fsaCheckout' },
    component: CheckoutPageComponent
  },
  // {
  //   path: 'Insurance-Products/:categoryTitle/:categoryType/c/:categoryCode',
  //   canActivate: [CmsPageGuard],
  //   redirectTo: null,
  //   data: { cxRedirectTo: 'checkout/' }
  // }
];


@NgModule({
  imports: [
    CommonModule,
    CheckoutPageLayoutModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig({
      layoutSlots: {
        MultiTabsCategoryPageTemplate: {
          slots: [
            'Section1',
            'Section2'
          ]
        }
      }
    }),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig> {
      // cmsComponents: {
      //   AccountPremiumCalendarSPAComponent: { // mapping hybris component (defined in impex)
      //     component: PremiumCalendarComponent // to SPA component
      //   }
      // },
      routing: {
        routes: {
          fsaCheckout: { // name from cxRoute property above
            paths: [
              'checkout/'
            ]
          }
        }
      }
    })
  ],
  declarations: [CheckoutPageComponent],
  exports: [CheckoutPageComponent]
})
export class CheckoutPageModule { }

// const routes: Routes = [
  // {
  //   path: null,
  //   canActivate: [CmsPageGuard],
  //   data: {
  //     cxRoute: 'checkout',
  //     pageLabel: 'multiStepCheckoutSummary'
  //   },
  //   component: PageLayoutComponent
  // },
  // {
  //   path: 'Insurance-Products/:categoryTitle/:categoryType/c/:categoryCode',
  //   canActivate: [CmsPageGuard],
  //   redirectTo: null,
  //   data: { cxRedirectTo: 'checkout/' }
  // }
// ];

// @NgModule({
//   imports: [
//     CommonModule,
//     CheckoutPageLayoutModule,
//     RouterModule.forChild(routes),
//     ConfigModule.withConfig(<CmsConfig | LayoutConfig | RoutesConfig | RoutingConfig>{
      // cmsComponents: {
      //   multiStepCheckoutSummary: {
      //     component: CheckoutPageComponent
      //   }
      // },
      // routing: {
      //   routes: {
      //     checkout: {
      //       paths: ['Insurance-Products/:categoryTitle/:categoryType/c/:categoryCode']
      //     }
      //   }
      // },
//       layoutSlots: {
//         MultiTabsCategoryPageTemplate: {
//           slots: [
//             'Section1',
//             'Section2'
//           ]
//         }
//       }
//       })
//   ],
//   declarations: [CheckoutPageComponent],
//   exports: [CheckoutPageComponent]
// })
// export class CheckoutPageModule { }
