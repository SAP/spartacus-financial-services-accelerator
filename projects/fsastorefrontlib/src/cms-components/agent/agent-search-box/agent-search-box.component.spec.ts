import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentSearchBoxComponent } from './agent-search-box.component';
import { RoutingService, I18nTestingModule } from '@spartacus/core';
import { Type, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

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

describe('AgentSearchBoxComponent', () => {
  let component: AgentSearchBoxComponent;
  let fixture: ComponentFixture<AgentSearchBoxComponent>;
  let routingService: RoutingService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, ReactiveFormsModule],
      providers: [
        {
          provide: RoutingService,
          useValue: { go: jasmine.createSpy() },
        },
      ],
      declarations: [AgentSearchBoxComponent, MockIconComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSearchBoxComponent);
    component = fixture.componentInstance;
    routingService = TestBed.inject(RoutingService as Type<RoutingService>);

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
