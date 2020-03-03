import { ChangeProcessNavigationComponent } from './change-process-navigation.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('ChangeProcessNavigationComponent', () => {
  let component: ChangeProcessNavigationComponent;
  let fixture: ComponentFixture<ChangeProcessNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeProcessNavigationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProcessNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
