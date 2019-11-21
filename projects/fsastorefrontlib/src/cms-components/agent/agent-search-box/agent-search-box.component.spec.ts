import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSearchBoxComponent } from './agent-search-box.component';
import { AgentSearchService } from 'projects/fsastorefrontlib/src/core/agent';

class MockAgentSearchService {
  search() {}
}

describe('AgentSearchBoxComponent', () => {
  let component: AgentSearchBoxComponent;
  let fixture: ComponentFixture<AgentSearchBoxComponent>;
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
      declarations: [AgentSearchBoxComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
