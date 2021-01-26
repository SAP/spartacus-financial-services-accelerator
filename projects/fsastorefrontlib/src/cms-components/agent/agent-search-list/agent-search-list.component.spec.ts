import { Component, Input, Pipe, PipeTransform, Type } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { of } from 'rxjs';
import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';
import { AgentSearchListComponent } from './agent-search-list.component';

const searchResults = {
  pagination: { page: 0 },
  agents: [
    {
      email: 'test@test.com',
    },
    {
      email: 'test2@test.com',
    },
  ],
};

const searchResultsPagination = {
  pagination: { page: 1 },
  agents: searchResults.agents,
};

const agent = {
  email: 'test@test.com',
};

class ActivatedRouteMock {
  paramsSubscriptionHandler: Function;

  queryParams = {
    subscribe: (observer: Function) => {
      this.paramsSubscriptionHandler = observer;
    },
  };
}
const query = 'autoAgent';
const selectedIndex = 1;

class MockAgentSearchService {
  search() {}
  getResults() {
    return of(searchResults);
  }
  getAgentByID() {
    return of(agent);
  }
}

@Component({
  // tslint:disable
  selector: 'cx-media',
  template: '',
})
class MockMediaComponent {
  @Input() container;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  // tslint:disable
  selector: 'cx-pagination',
  template: '',
})
class MockPagintionComponent {
  @Input() pagination;
}

@Component({
  // tslint:disable
  selector: 'cx-store-finder-map',
  template: '',
})
class MockMapComponent {
  @Input() locations: any;
}

describe('AgentSearchListComponent', () => {
  let component: AgentSearchListComponent;
  let fixture: ComponentFixture<AgentSearchListComponent>;
  let mockSearchService: AgentSearchService;
  let activatedRoute: ActivatedRouteMock;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule],
        providers: [
          { provide: ActivatedRoute, useClass: ActivatedRouteMock },
          { provide: AgentSearchService, useClass: MockAgentSearchService },
        ],
        declarations: [
          AgentSearchListComponent,
          MockPagintionComponent,
          MockMediaComponent,
          MockUrlPipe,
          MockMapComponent,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSearchListComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.get(ActivatedRoute as Type<ActivatedRoute>);
    mockSearchService = TestBed.inject(
      AgentSearchService as Type<AgentSearchService>
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find agents with query', () => {
    spyOn(mockSearchService, 'search').and.callThrough();
    activatedRoute.paramsSubscriptionHandler({ query: query });
    expect(mockSearchService.search).toHaveBeenCalled();
  });

  it('should set index for active agent', () => {
    component.setActiveAgentIndex(selectedIndex);
    expect(component.selectedIndex).toEqual(selectedIndex);
  });

  it('should select an agent', done => {
    spyOn(mockSearchService, 'getAgentByID').and.returnValue(of(agent));
    component.showDetails(agent);
    expect(mockSearchService.getAgentByID).toHaveBeenCalled();
    component.selectedAgent$.subscribe(selectedAgent => {
      expect(selectedAgent.email).toEqual('test@test.com');
      done();
    });
  });

  it('should change page', done => {
    spyOn(mockSearchService, 'getResults').and.returnValue(
      of(searchResultsPagination)
    );
    component.ngOnInit();
    component.pageChange(1);
    component.searchResults$.subscribe(() => {
      expect(component.pagination.currentPage).toEqual(1);
      done();
    });
  });

  it('should show list of all agents on the back to list button', () => {
    const selectedIndex = -1;
    spyOn(mockSearchService, 'search').and.callThrough();
    component.setActiveAgentIndex(selectedIndex);
    expect(mockSearchService.search).toHaveBeenCalled();
  });
});
