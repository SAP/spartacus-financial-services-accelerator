import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonTableSyncPilotComponent } from './comparison-table-sync-pilot.component';

describe('ComparisonTableSyncPilotComponent', () => {
  let component: ComparisonTableSyncPilotComponent;
  let fixture: ComponentFixture<ComparisonTableSyncPilotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparisonTableSyncPilotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonTableSyncPilotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
