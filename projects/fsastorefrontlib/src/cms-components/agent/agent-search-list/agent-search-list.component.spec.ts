import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentSearchListComponent } from './agent-search-list.component';
import { of } from 'rxjs';
import { AgentSearchService } from 'projects/fsastorefrontlib/src/core/agent';

const searchResults = {};

class MockAgentSearchService {
  getResults() {
    of(searchResults);
  }
}

describe('AgentSearchListComponent', () => {
  let component: AgentSearchListComponent;
  let fixture: ComponentFixture<AgentSearchListComponent>;
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
      declarations: [AgentSearchListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
