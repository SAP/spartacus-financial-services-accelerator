import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  UrlModule,
} from '@spartacus/core';
import {
  MediaModule,
  StoreFinderModule,
  ListNavigationModule,
  IconModule,
  PageLayoutComponent,
  CmsPageGuard,
} from '@spartacus/storefront';
import { AgentRootComponent } from './agent-root/agent-root.component';
import { FindAgentNavigationComponent } from './find-agent-navigation/find-agent-navigation.component';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { AgentSearchBoxComponent } from './agent-search-box/agent-search-box.component';
import { AgentSearchListComponent } from './agent-search-list/agent-search-list.component';
import { ContactAgentFormComponent } from './contact-agent-form/contact-agent-form.component';

import { AgentConnector } from '../../core/agent/connectors/agent.connector';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    MediaModule,
    I18nModule,
    UrlModule,
    IconModule,
    StoreFinderModule,
    ReactiveFormsModule,
    ListNavigationModule,
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
      },
    }),
  ],
  declarations: [
    AgentRootComponent,
    ContactAgentFormComponent,
    FindAgentNavigationComponent,
    AgentSearchBoxComponent,
    AgentSearchListComponent,
  ],
  exports: [
    AgentRootComponent,
    ContactAgentFormComponent,
    FindAgentNavigationComponent,
    AgentSearchBoxComponent,
    AgentSearchListComponent,
  ],
  entryComponents: [
    AgentRootComponent,
    ContactAgentFormComponent,
    FindAgentNavigationComponent,
    AgentSearchBoxComponent,
    AgentSearchListComponent,
  ],
  providers: [AgentConnector],
})
export class AgentModule {}
