import { Component, Input, Pipe, PipeTransform, Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
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
  ],
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
const mockAgentSearchService = {
  search: jasmine.createSpy(),
  getResults: jasmine.createSpy().and.returnValue(of(searchResults)),
};

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: AgentSearchService, useValue: mockAgentSearchService },
      ],
      declarations: [
        AgentSearchListComponent,
        MockPagintionComponent,
        MockMediaComponent,
        MockUrlPipe,
        MockMapComponent,
      ],
    }).compileComponents();
  }));

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
    activatedRoute.paramsSubscriptionHandler({ query: query });
    expect(mockSearchService.search).toHaveBeenCalled();
  });
  it('should set index for active agent', () => {
    component.setActiveAgentIndex(selectedIndex);
    expect(component.selectedIndex).toEqual(selectedIndex);
  });
});
