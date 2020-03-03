import { ChangeProcessProgressBarComponent } from './change-process-progress-bar.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('ChangeProcessProgressBarComponent', () => {
  let component: ChangeProcessProgressBarComponent;
  let fixture: ComponentFixture<ChangeProcessProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeProcessProgressBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProcessProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
