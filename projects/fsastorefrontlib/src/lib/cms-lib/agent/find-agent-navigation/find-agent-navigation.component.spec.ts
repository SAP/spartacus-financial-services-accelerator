import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindAgentNavigationComponent } from './find-agent-navigation.component';

describe('FindAgentNavigationComponent', () => {
  let component: FindAgentNavigationComponent;
  let fixture: ComponentFixture<FindAgentNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FindAgentNavigationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindAgentNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
