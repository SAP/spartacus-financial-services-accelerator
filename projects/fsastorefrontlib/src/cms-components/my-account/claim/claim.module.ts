import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  RoutesConfig,
  RoutingConfig,
  UrlModule,
} from '@spartacus/core';
import {
  CmsPageGuard,
  PageLayoutComponent,
  SpinnerModule,
  CardModule,
  MediaModule,
} from '@spartacus/storefront';
import { DeleteClaimDialogComponent } from './delete-claim-dialog/delete-claim-dialog.component';
import { ClaimPoliciesComponent } from './claim-policies/claim-policies.component';
import { ClaimsComponent } from './claims/claims.component';
import { CreateClaimComponent } from './create-claim/create-claim.component';
import { ClaimDataService } from '../../../core/my-account/services/claim-data.service';
import { ClaimService } from '../../../core/my-account/facade/claim.service';
import { ClaimPoliciesGuard } from './guards/claim-policies-guard';
import { ClaimConnector } from '../../../core/my-account/connectors/claim.connector';
import { NoClaimPoliciesGuard } from './guards/no-claim-policies.guard';
import { DateFormatConfigurationModule } from '../../../shared/util/helpers/pipe/dateFormatConfiguration.module';
import { ClaimDetailsComponent } from './claim-details/claim-details.component';
import { AccordionModule } from '../../../shared/accordion/accordion.module';
import { DocumentsTableModule } from '../documents/documents-table/documents-table.module';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'claims',
      pageLabel: 'my-claims',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, NoClaimPoliciesGuard],
    data: {
      cxRoute: 'noClaims',
      pageLabel: 'noClaimsPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard, ClaimPoliciesGuard],
    data: {
      cxRoute: 'claimsPage',
      pageLabel: 'claimsPage',
    },
    component: PageLayoutComponent,
  },
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'claimDetails',
      pageLabel: 'claim-details',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    SpinnerModule,
    CardModule,
    UrlModule,
    MediaModule,
    AccordionModule,
    DateFormatConfigurationModule,
    DocumentsTableModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        AccountMyClaimsFlex: {
          component: ClaimsComponent,
        },
        ClaimActivePoliciesFlex: {
          component: ClaimPoliciesComponent,
          guards: [AuthGuard],
        },
        StartClaimFlex: {
          component: CreateClaimComponent,
          guards: [AuthGuard],
        },
        AccountClaimDetailsFlex: {
          component: ClaimDetailsComponent,
        },
      },
    }),
  ],
  declarations: [
    ClaimsComponent,
    DeleteClaimDialogComponent,
    ClaimPoliciesComponent,
    CreateClaimComponent,
    ClaimDetailsComponent,
  ],
  exports: [
    ClaimsComponent,
    DeleteClaimDialogComponent,
    ClaimPoliciesComponent,
    CreateClaimComponent,
    ClaimDetailsComponent,
  ],
  providers: [
    ClaimService,
    ClaimDataService,
    ClaimPoliciesComponent,
    ClaimConnector,
  ],
  entryComponents: [
    ClaimsComponent,
    DeleteClaimDialogComponent,
    ClaimPoliciesComponent,
    CreateClaimComponent,
    ClaimDetailsComponent,
  ],
})
export class ClaimModule {}
