import { Component, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { StoreFinderSearchComponent } from '@spartacus/storefront';

@Component({
  selector: 'fsa-agent-search-box',
  templateUrl: './agent-search-box.component.html',
})
export class AgentSearchBoxComponent extends StoreFinderSearchComponent
  implements OnInit {
  constructor(protected fsRoutingService: RoutingService) {
    super(fsRoutingService);
  }

  ngOnInit() {
    this.findAgents(null);
  }

  findAgents(searchQuery: string) {
    this.fsRoutingService.go(['agent-locator'], { query: searchQuery });
  }

  onKey(event: any) {
    if (
      this.searchBox.value &&
      this.searchBox.value.length > 0 &&
      event.key === 'Enter'
    ) {
      this.findAgents(this.searchBox.value);
    }
  }
}
