import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FSRegisterComponent } from './fs-register.component';

describe('FSRefisterComponent', () => {
  let component: FSRegisterComponent;
  let fixture: ComponentFixture<FSRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FSRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FSRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
