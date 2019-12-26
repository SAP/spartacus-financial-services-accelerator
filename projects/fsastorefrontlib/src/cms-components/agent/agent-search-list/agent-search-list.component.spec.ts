import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentSearchListComponent } from './agent-search-list.component';
import { of } from 'rxjs';
import { AgentSearchService } from '../../../core/agent/services/agent-search.service';
import { ActivatedRoute } from '@angular/router';
import { Type, Component, Input } from '@angular/core';

const searchResults = { pagination: { page: 0 } };

class ActivatedRouteMock {
  paramsSubscriptionHandler: Function;

  queryParams = {
    subscribe: (observer: Function) => {
      this.paramsSubscriptionHandler = observer;
    },
  };
}
const query = 'autoAgent';

const mockAgentSearchService = {
  search: jasmine.createSpy(),
  getResults: jasmine.createSpy().and.returnValue(of(searchResults)),
};

@Component({
  // tslint:disable
  selector: 'cx-pagination',
  template: '',
})
class MockPagintionComponent {
  @Input() pagination;
}
describe('AgentSearchListComponent', () => {
  let component: AgentSearchListComponent;
  let fixture: ComponentFixture<AgentSearchListComponent>;
  let mockSearchService: AgentSearchService;
  let activatedRoute: ActivatedRouteMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: AgentSearchService, useValue: mockAgentSearchService },
      ],
      declarations: [AgentSearchListComponent, MockPagintionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSearchListComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.get(ActivatedRoute as Type<ActivatedRoute>);
    mockSearchService = TestBed.get(AgentSearchService as Type<
      AgentSearchService
    >);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should find agents with query', () => {
    activatedRoute.paramsSubscriptionHandler({ query: query });

    expect(mockSearchService.search).toHaveBeenCalled();
  });
});
