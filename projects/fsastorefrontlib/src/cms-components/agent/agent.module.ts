import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  AuthGuard,
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
import { OccAgentAdapter } from '../../occ/services/agent/occ-agent.adapter';
import { AgentRootComponent } from './agent-root/agent-root.component';
import { FindAgentNavigationComponent } from './find-agent-navigation/find-agent-navigation.component';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { AgentSearchBoxComponent } from './agent-search-box/agent-search-box.component';
import { AgentSearchListComponent } from './agent-search-list/agent-search-list.component';
import { AgentSearchDetailsComponent } from './agent-search-details/agent-search-details.component';
import { ContactAgentFormComponent } from './contact-agent-form/contact-agent-form.component';

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
        canActivate: [AuthGuard, CmsPageGuard],
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
        AgentSearchDetailsFlex: {
          component: AgentSearchDetailsComponent,
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
    AgentSearchDetailsComponent,
  ],
  exports: [
    AgentRootComponent,
    ContactAgentFormComponent,
    FindAgentNavigationComponent,
    AgentSearchBoxComponent,
    AgentSearchListComponent,
    AgentSearchDetailsComponent,
  ],
  entryComponents: [
    AgentRootComponent,
    ContactAgentFormComponent,
    FindAgentNavigationComponent,
    AgentSearchBoxComponent,
    AgentSearchListComponent,
    AgentSearchDetailsComponent,
  ],
  providers: [OccAgentAdapter],
})
export class AgentModule {}
