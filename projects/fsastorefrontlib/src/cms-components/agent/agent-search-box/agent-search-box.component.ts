import { Component, OnDestroy, OnInit } from '@angular/core';
import { RoutingService } from '@spartacus/core';
import { StoreFinderSearchComponent } from '@spartacus/storefinder/components';
import { Subscription } from 'rxjs';
import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';

@Component({
  selector: 'cx-fs-agent-search-box',
  templateUrl: './agent-search-box.component.html',
})
export class AgentSearchBoxComponent extends StoreFinderSearchComponent
  implements OnInit, OnDestroy {
  subscription = new Subscription();

  constructor(
    protected fsRoutingService: RoutingService,
    protected agentSearchService: AgentSearchService
  ) {
    super(fsRoutingService);
  }

  ngOnInit() {
    this.resetSearchValueAndRouteParams();
  }

  findAgents(searchQuery: string) {
    this.fsRoutingService.go({
      cxRoute: 'agent-locator',
      params: { query: searchQuery },
    });
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

  protected resetSearchValueAndRouteParams() {
    this.subscription.add(
      this.agentSearchService.resetSearchValue.subscribe(isReset => {
        if (isReset) {
          this.searchBox.setValue('');
          this.findAgents(null);
        }
      })
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
