import { Component, Input, Type } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { AgentSearchService } from '../../../core/agent/facade/agent-search.service';
import { AgentSearchBoxComponent } from './agent-search-box.component';

const query = 'autoAgent';

@Component({
  // tslint:disable
  selector: 'cx-icon',
  template: '',
})
class MockIconComponent {
  @Input()
  routerLink: string;
  @Input()
  type: string;
  @Input()
  queryParams: string;
}

class MockAgentSearchService {
  resetSearchValue = of(true);
}

describe('AgentSearchBoxComponent', () => {
  let component: AgentSearchBoxComponent;
  let fixture: ComponentFixture<AgentSearchBoxComponent>;
  let routingService: RoutingService;
  let mockSearchService: AgentSearchService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, ReactiveFormsModule],
        providers: [
          {
            provide: AgentSearchService,
            useClass: MockAgentSearchService,
          },
          {
            provide: RoutingService,
            useValue: { go: jasmine.createSpy() },
          },
        ],
        declarations: [AgentSearchBoxComponent, MockIconComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSearchBoxComponent);
    component = fixture.componentInstance;
    routingService = TestBed.inject(RoutingService as Type<RoutingService>);
    mockSearchService = TestBed.inject(
      AgentSearchService as Type<AgentSearchService>
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch new query', () => {
    component.findAgents(query);
    expect(routingService.go).toHaveBeenCalledWith({
      cxRoute: 'agent-locator',
      params: { query },
    });
  });
});
