import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentSearchBoxComponent } from './agent-search-box.component';
import { RoutingService } from '@spartacus/core';
import { Type } from '@angular/core';

const query = 'autoAgent';

describe('AgentSearchBoxComponent', () => {
  let component: AgentSearchBoxComponent;
  let fixture: ComponentFixture<AgentSearchBoxComponent>;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: RoutingService,
          useValue: { go: jasmine.createSpy() },
        },
      ],
      declarations: [AgentSearchBoxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSearchBoxComponent);
    component = fixture.componentInstance;
    routingService = TestBed.get(RoutingService as Type<RoutingService>);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch new query', () => {
    component.findAgents(query);
    expect(routingService.go).toHaveBeenCalledWith(['agent-locator'], {
      query,
    });
  });
});
