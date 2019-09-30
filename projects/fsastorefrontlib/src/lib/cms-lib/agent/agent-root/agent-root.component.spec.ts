import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRootComponent } from './agent-root.component';

describe('AgentRootComponent', () => {
  let component: AgentRootComponent;
  let fixture: ComponentFixture<AgentRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
