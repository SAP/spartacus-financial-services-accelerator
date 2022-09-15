import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  MediaModule,
  ListNavigationModule,
  IconModule,
  PageLayoutComponent,
  CmsPageGuard,
  SpinnerModule,
  FormErrorsModule,
} from '@spartacus/storefront';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AgentRootComponent } from './agent-root/agent-root.component';
import { FindAgentNavigationComponent } from './find-agent-navigation/find-agent-navigation.component';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { AgentSearchBoxComponent } from './agent-search-box/agent-search-box.component';
import { AgentSearchListComponent } from './agent-search-list/agent-search-list.component';
import { ContactAgentFormComponent } from './contact-agent-form/contact-agent-form.component';

import { AgentConnector } from '../../core/agent/connectors/agent.connector';
import { StoreFinderComponentsModule } from '@spartacus/storefinder/components';
import { StoreFinderModule } from '@spartacus/storefinder';
import { GenericSyncPilotModule } from '../sync-pilot/generic-sync-pilot/generic-sync-pilot.module';
import { AppointmentSchedulingFormComponent } from './appointment-scheduling/appointment-scheduling-form.component';
import { AppointmentSchedulingConfirmationComponent } from './appointment-scheduling-confirmation/appointment-scheduling-confirmation.component';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    MediaModule,
    I18nModule,
    UrlModule,
    IconModule,
    StoreFinderModule,
    StoreFinderComponentsModule,
    ReactiveFormsModule,
    ListNavigationModule,
    SpinnerModule,
    FormErrorsModule,
    NgbTooltipModule,
    GenericSyncPilotModule,
    RouterModule.forChild([
      {
        path: null,
        canActivate: [CmsPageGuard],
        data: {
          cxRoute: 'contactAgent',
          pageLabel: 'contactAgentPage',
        },
        component: PageLayoutComponent,
      },
      {
        path: null,
        canActivate: [CmsPageGuard],
        data: {
          cxRoute: 'agentLocator',
          pageLabel: 'agent-locator',
        },
        component: PageLayoutComponent,
      },
      {
        path: null,
        canActivate: [CmsPageGuard, AuthGuard],
        data: {
          cxRoute: 'appointmentSchedulingPage',
          pageLabel: 'appointment-scheduling',
        },
        component: PageLayoutComponent,
      },
      {
        path: null,
        canActivate: [CmsPageGuard, AuthGuard],
        data: {
          cxRoute: 'appointmentSchedulingConfirmationPage',
          pageLabel: 'appointmentSchedulingConfirmationPage',
        },
        component: PageLayoutComponent,
      },
    ]),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSAgentRootComponent: {
          component: AgentRootComponent,
        },
        ContactAgentFormFlex: {
          component: ContactAgentFormComponent,
        },
        FindAgentNavigationTypeFlex: {
          component: FindAgentNavigationComponent,
        },
        AgentSearchBoxFlex: {
          component: AgentSearchBoxComponent,
        },
        AgentSearchListFlex: {
          component: AgentSearchListComponent,
        },
        AppointmentSchedulingFlex: {
          component: AppointmentSchedulingFormComponent,
        },
        AppointmentSchedulingConfirmationFlex: {
          component: AppointmentSchedulingConfirmationComponent,
        },
      },
    }),
  ],
  declarations: [
    AgentRootComponent,
    ContactAgentFormComponent,
    FindAgentNavigationComponent,
    AgentSearchBoxComponent,
    AgentSearchListComponent,
    AppointmentSchedulingFormComponent,
    AppointmentSchedulingConfirmationComponent,
  ],
  exports: [
    AgentRootComponent,
    ContactAgentFormComponent,
    FindAgentNavigationComponent,
    AgentSearchBoxComponent,
    AgentSearchListComponent,
    AppointmentSchedulingFormComponent,
    AppointmentSchedulingConfirmationComponent,
  ],
  providers: [AgentConnector],
})
export class AgentModule {}
