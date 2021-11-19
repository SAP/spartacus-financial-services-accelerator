import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PaginationModel, User } from '@spartacus/core';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';
import { AgentSyncPilotComponent } from '../agent-sync-pilot/agent-sync-pilot.component';

@Component({
  selector: 'cx-fs-agent-search-list',
  templateUrl: './agent-search-list.component.html',
})
export class AgentSearchListComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  user$: Observable<User> = this.userAccountFacade.get();
  searchResults$: Observable<any>;
  searchQuery: string;
  selectedAgent$: Observable<any>;
  selectedIndex = 0;
  pagination: PaginationModel;
  initialActiveAgent: any;
  singleAgentSelected = false;
  navigator: Navigator = globalThis.navigator;

  constructor(
    protected agentSearchService: AgentSearchService,
    protected route: ActivatedRoute,
    protected userAccountFacade: UserAccountFacade
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.route.queryParams.subscribe(params => this.initialize(params))
    );
    this.searchResults$ = this.agentSearchService.getResults().pipe(
      filter(searchResult => !!searchResult),
      tap(searchResult => {
        this.initialActiveAgent = searchResult.agents[0];
        this.pagination = {
          currentPage: searchResult.pagination.page,
          pageSize: searchResult.pagination.count,
          totalPages: searchResult.pagination.totalPages,
          totalResults: searchResult.pagination.totalCount,
        };
      })
    );
  }

  private initialize(queryParams: Params) {
    queryParams.query
      ? (this.searchQuery = queryParams.query)
      : (this.searchQuery = '');
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
      this.singleAgentSelected = false;
      this.agentSearchService.search(this.searchQuery, 0);
      this.agentSearchService.setResetSearchValue(true);
    } else {
      this.singleAgentSelected = true;
    }
    // after clicking on the Back to list first in the list should be selected
    this.selectedIndex = selectedIndex === -1 ? 0 : selectedIndex;
  }

  ngOnDestroy() {
    this.agentSearchService.agents.next(null);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
