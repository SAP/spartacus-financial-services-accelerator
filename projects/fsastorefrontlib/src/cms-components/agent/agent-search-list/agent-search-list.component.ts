import { Component } from '@angular/core';
import { AgentSearchService } from 'projects/fsastorefrontlib/src/core/agent';

@Component({
  selector: 'fsa-agent-search-list',
  templateUrl: './agent-search-list.component.html',
})
export class AgentSearchListComponent {
  constructor(protected agentSearchService: AgentSearchService) {}

  searchResults$ = this.agentSearchService.getResults();

  showDetails(agent) {
    this.agentSearchService.setAgent(agent);
  }
}
