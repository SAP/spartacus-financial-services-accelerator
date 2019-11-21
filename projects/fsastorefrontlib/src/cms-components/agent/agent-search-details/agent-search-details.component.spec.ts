import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSearchDetailsComponent } from './agent-search-details.component';

describe('AgentSearchDetailsComponent', () => {
  let component: AgentSearchDetailsComponent;
  let fixture: ComponentFixture<AgentSearchDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
