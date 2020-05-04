import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';

@Component({
  selector: 'cx-fs-agent-search-list',
  templateUrl: './agent-search-list.component.html',
})
export class AgentSearchListComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  searchResults: Observable<any>;
  searchQuery: string;
  pagination: any;
  selectedAgent$: Observable<any>;
  selectedIndex = 0;

  constructor(
    protected agentSearchService: AgentSearchService,
    protected route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.route.queryParams.subscribe(params => this.initialize(params))
    );

    this.searchResults = this.agentSearchService.getResults();
  }

  private initialize(queryParams: Params) {
    if (queryParams.query) {
      this.searchQuery = queryParams.query;
    }
    this.agentSearchService.search(this.searchQuery, 0);
  }

  showDetails(agent) {
    this.selectedAgent$ = this.agentSearchService.getAgentByID(agent.email);
  }

  pageChange(page: number): void {
    this.agentSearchService.search(this.searchQuery, page);
  }

  setActiveAgentIndex(selectedIndex: number) {
    this.selectedIndex = selectedIndex;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
