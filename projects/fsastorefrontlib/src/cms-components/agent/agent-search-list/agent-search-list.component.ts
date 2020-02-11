import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AgentSearchService } from '../../../core/agent/services/agent-search.service';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'fsa-agent-search-list',
  templateUrl: './agent-search-list.component.html',
})
export class AgentSearchListComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  searchResults: any;
  searchQuery: string;
  pagination: any;

  constructor(
    private agentSearchService: AgentSearchService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.route.queryParams.subscribe(params => this.initialize(params))
    );
    this.subscription.add(
      this.agentSearchService
        .getResults()
        .pipe(
          filter(result => result !== null),
          map(result => {
            this.searchResults = result;
            this.pagination = result.pagination;
            this.pagination.currentPage = result.pagination.page;
          })
        )
        .subscribe()
    );
  }

  private initialize(queryParams: Params) {
    if (queryParams && queryParams.query) {
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
