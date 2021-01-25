import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PaginationModel } from '@spartacus/core';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';

@Component({
  selector: 'cx-fs-agent-search-list',
  templateUrl: './agent-search-list.component.html',
})
export class AgentSearchListComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  searchResults$: Observable<any>;
  searchQuery: string;
  selectedAgent$: Observable<any>;
  selectedIndex = 0;
  pagination: PaginationModel;
  initialActiveAgent: any;
  navigator: Navigator = window.navigator;
  screenSize: number;

  constructor(
    protected agentSearchService: AgentSearchService,
    protected route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.screenSize = this.navigator.maxTouchPoints;
    this.subscription.add(
      this.route.queryParams.subscribe(params => this.initialize(params))
    );

    this.searchResults$ = this.agentSearchService.getResults().pipe(
      tap(agents => {
        if (agents) {
          this.initialActiveAgent = agents.agents[0];
          this.pagination = {
            currentPage: agents.pagination.page,
            pageSize: agents.pagination.count,
            totalPages: agents.pagination.totalPages,
            totalResults: agents.pagination.totalCount,
          };
        }
      })
    );
  }

  private initialize(queryParams: Params) {
    if (queryParams.query) {
      this.searchQuery = queryParams.query;
    }
    this.agentSearchService.search(this.searchQuery, 0);
  }

  showDetails(agent) {
    this.initialActiveAgent = null;
    this.selectedAgent$ = this.agentSearchService.getAgentByID(agent.email);
  }

  pageChange(page: number): void {
    this.agentSearchService.search(this.searchQuery, page);
  }

  setActiveAgentIndex(selectedIndex: number) {
    if (selectedIndex === -1) {
      this.searchQuery = '';
      this.selectedAgent$ = null;
      this.getAgents('');
    }
    this.selectedIndex = selectedIndex;
  }

  getAgents(searchValue: string) {
    this.agentSearchService.search(searchValue, 0);
  }

  ngOnDestroy() {
    this.agentSearchService.agents.next(null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
