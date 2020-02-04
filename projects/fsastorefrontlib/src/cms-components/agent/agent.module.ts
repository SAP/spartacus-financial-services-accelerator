import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentRootComponent } from './agent-root/agent-root.component';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  AuthGuard,
} from '@spartacus/core';
import { OccAgentAdapter } from '../../occ/services/agent/occ-agent.adapter';
import { FindAgentNavigationComponent } from './find-agent-navigation/find-agent-navigation.component';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import {
  MediaModule,
  StoreFinderModule,
  ListNavigationModule,
  IconModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { RouterModule } from '@angular/router';
import { AgentSearchBoxComponent } from './agent-search-box/agent-search-box.component';
import { AgentSearchListComponent } from './agent-search-list/agent-search-list.component';
import { AgentSearchDetailsComponent } from './agent-search-details/agent-search-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactAgentFormComponent } from './contact-agent-form/contact-agent-form.component';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    MediaModule,
    I18nModule,
    IconModule,
    StoreFinderModule,
    ReactiveFormsModule,
    ListNavigationModule,
    RouterModule.forChild([
      {
        path: 'contact-agent',
        canActivate: [AuthGuard],
        data: {
          cxRoute: 'contactAgent',
          pageLabel: 'contactAgent',
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
    ContactAgentFormComponent,
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
