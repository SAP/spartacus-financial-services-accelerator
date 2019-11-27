import { Component } from '@angular/core';
import { AgentSearchService } from '../../../core/agent/services/agent-search.service';

@Component({
  selector: 'fsa-agent-search-details',
  templateUrl: './agent-search-details.component.html',
})
export class AgentSearchDetailsComponent {
  constructor(protected agentSearchService: AgentSearchService) {}

  agent$ = this.agentSearchService.getAgent();
}
