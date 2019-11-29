import { Component, OnInit } from '@angular/core';
import { AgentSearchService } from '../../../core/agent/services/agent-search.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fsa-agent-search-list',
  templateUrl: './agent-search-list.component.html',
})
export class AgentSearchListComponent implements OnInit {
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
    this.agentSearchService.search(this.searchQuery, 0);
  }

  showDetails(agent) {
    this.agentSearchService.setAgent(agent);
  }

  pageChange(page: number): void {
    this.agentSearchService.search(this.searchQuery, page);
  }
}
