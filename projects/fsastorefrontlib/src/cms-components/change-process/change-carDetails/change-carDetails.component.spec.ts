import { ChangeCarDetailsComponent } from './change-carDetails.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('ChangeCarDetailsComponent', () => {
  let component: ChangeCarDetailsComponent;
  let fixture: ComponentFixture<ChangeCarDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChangeCarDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCarDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
