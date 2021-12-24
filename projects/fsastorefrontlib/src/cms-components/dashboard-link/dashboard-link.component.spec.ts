import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLinkComponent } from './dashboard-link.component';

describe('DashboardLinkComponent', () => {
  let component: DashboardLinkComponent;
  let fixture: ComponentFixture<DashboardLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardLinkComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
