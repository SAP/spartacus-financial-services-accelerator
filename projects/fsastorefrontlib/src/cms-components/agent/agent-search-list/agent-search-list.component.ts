import { Component, Input } from '@angular/core';
import { AgentSearchService } from 'projects/fsastorefrontlib/src/core/agent';
import { Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fsa-agent-search-list',
  templateUrl: './agent-search-list.component.html',
})
export class AgentSearchListComponent {
  subscription: Subscription;
  searchResults$ = this.agentSearchService.getResults();
  searchQuery: string;

  constructor(
    private agentSearchService: AgentSearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription = this.route.queryParams.subscribe(params =>
      this.initialize(params)
    );
  }

  private initialize(queryParams: Params) {
    if (queryParams.query) {
      this.searchQuery = queryParams.query;
    }
  }

  showDetails(agent) {
    this.agentSearchService.setAgent(agent);
  }

  pageChange(page: number): void {
    console.log(page);
    this.agentSearchService.search(this.searchQuery, page);
  }
}
