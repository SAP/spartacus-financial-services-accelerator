import { Component, OnInit } from '@angular/core';
import { AgentSearchService } from 'projects/fsastorefrontlib/src/core/agent';

@Component({
  selector: 'fsa-agent-search-box',
  templateUrl: './agent-search-box.component.html',
})
export class AgentSearchBoxComponent implements OnInit {
  constructor(protected agentSearchService: AgentSearchService) {}

  ngOnInit() {}

  search(searchQuery: string) {
    this.agentSearchService.search(searchQuery);
  }
}
