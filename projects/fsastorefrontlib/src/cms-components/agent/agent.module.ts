import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentRootComponent } from './agent-root/agent-root.component';
import { CmsConfig, ConfigModule, I18nModule } from '@spartacus/core';
import { OccAgentService } from '../../lib/occ/agent/agent.service';
import { FindAgentNavigationComponent } from './find-agent-navigation/find-agent-navigation.component';
import { AccordionModule } from '../../shared/accordion/accordion.module';
import { MediaModule } from '@spartacus/storefront';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    AccordionModule,
    MediaModule,
    I18nModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSAgentRootComponent: {
          component: AgentRootComponent,
        },
        FindAgentNavigationTypeFlex: {
          component: FindAgentNavigationComponent,
        },
      },
    }),
  ],
  declarations: [AgentRootComponent, FindAgentNavigationComponent],
  exports: [AgentRootComponent, FindAgentNavigationComponent],
  entryComponents: [AgentRootComponent, FindAgentNavigationComponent],
  providers: [OccAgentService],
})
export class AgentModule {}
