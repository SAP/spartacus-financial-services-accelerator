import { Component } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { StoreFinderSearchComponent } from '@spartacus/storefront';

@Component({
  selector: 'fsa-agent-search-box',
  templateUrl: './agent-search-box.component.html',
})
export class AgentSearchBoxComponent extends StoreFinderSearchComponent {
  constructor(protected fsRoutingService: RoutingService) {
    super(fsRoutingService);
  }

  findAgents(searchQuery: string) {
    this.fsRoutingService.go(['agent-locator'], { query: searchQuery });
  }

  onKey(event: any) {
    if (
      this.searchBox.value &&
      this.searchBox.value.length &&
      event.key === 'Enter'
    ) {
      this.findAgents(this.searchBox.value);
    }
  }
}
