import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FSProgressBarComponent } from './progress-bar.component';

describe('FSProgressBarComponent', () => {
  let component: FSProgressBarComponent;
  let fixture: ComponentFixture<FSProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FSProgressBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FSProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
