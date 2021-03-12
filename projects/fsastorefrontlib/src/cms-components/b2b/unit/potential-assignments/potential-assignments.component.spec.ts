import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialAssignmentsComponent } from './potential-assignments.component';

describe('PotentialAssignmentsComponent', () => {
  let component: PotentialAssignmentsComponent;
  let fixture: ComponentFixture<PotentialAssignmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialAssignmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PotentialAssignmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
