import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSearchListComponent } from './agent-search-list.component';

describe('AgentSearchListComponent', () => {
  let component: AgentSearchListComponent;
  let fixture: ComponentFixture<AgentSearchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
