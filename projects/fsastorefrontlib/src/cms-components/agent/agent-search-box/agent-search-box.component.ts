import { Component, OnInit } from '@angular/core';
import { AgentSearchService } from 'projects/fsastorefrontlib/src/core/agent';
import { RoutingService } from '@spartacus/core';

@Component({
  selector: 'fsa-agent-search-box',
  templateUrl: './agent-search-box.component.html',
})
export class AgentSearchBoxComponent implements OnInit {
  constructor(
    protected agentSearchService: AgentSearchService,
    protected routingService: RoutingService
  ) {}

  ngOnInit() {}

  search(searchQuery: string) {
    this.agentSearchService.search(searchQuery, 0);
    this.findStores(searchQuery);
  }

  findStores(searchQuery: string) {
    this.routingService.go(['agent-locator'], { query: searchQuery });
  }
}
