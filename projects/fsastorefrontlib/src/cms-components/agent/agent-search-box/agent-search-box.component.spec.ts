import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSearchBoxComponent } from './agent-search-box.component';

describe('AgentSearchBoxComponent', () => {
  let component: AgentSearchBoxComponent;
  let fixture: ComponentFixture<AgentSearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
