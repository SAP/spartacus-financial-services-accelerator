import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { AgentAdapter } from '../../../core/agent';
import { OccAgentAdapter } from '../agent/occ-agent.adapter';
import { defaultOccAgentConfig } from './default-occ-agent-config';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: AgentAdapter,
      useClass: OccAgentAdapter,
    },
    provideConfig(defaultOccAgentConfig),
  ],
})
export class AgentOccModule {}
