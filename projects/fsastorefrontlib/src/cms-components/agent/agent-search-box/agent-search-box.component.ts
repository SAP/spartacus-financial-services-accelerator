import { Component } from '@angular/core';
import { RoutingService } from '@spartacus/core';

@Component({
  selector: 'fsa-agent-search-box',
  templateUrl: './agent-search-box.component.html',
})
export class AgentSearchBoxComponent {
  constructor(protected routingService: RoutingService) {}

  findAgents(searchQuery: string) {
    this.routingService.go(['agent-locator'], { query: searchQuery });
  }
}
