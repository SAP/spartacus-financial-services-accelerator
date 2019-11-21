import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentSearchDetailsComponent } from './agent-search-details.component';
import { of } from 'rxjs';
import { AgentSearchService } from 'projects/fsastorefrontlib/src/core/agent';

const agent = {};

class MockAgentSearchService {
  getAgent() {
    of(agent);
  }
}

describe('AgentSearchDetailsComponent', () => {
  let component: AgentSearchDetailsComponent;
  let fixture: ComponentFixture<AgentSearchDetailsComponent>;
  let mockSearchService: MockAgentSearchService;

  beforeEach(async(() => {
    mockSearchService = new MockAgentSearchService();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AgentSearchService,
          useValue: mockSearchService,
        },
      ],
      declarations: [AgentSearchDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSearchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
