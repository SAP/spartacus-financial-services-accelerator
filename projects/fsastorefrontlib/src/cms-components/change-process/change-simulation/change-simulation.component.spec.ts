import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeSimulationComponent } from './change-simulation.component';

describe('ChangeSimulationComponent', () => {
  let component: ChangeSimulationComponent;
  let fixture: ComponentFixture<ChangeSimulationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeSimulationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeSimulationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
