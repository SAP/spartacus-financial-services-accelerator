import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YFormCMSComponent } from './yform-cms.component';

describe('YformSubmitComponentComponent', () => {
  let component: YFormCMSComponent;
  let fixture: ComponentFixture<YFormCMSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [YFormCMSComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YFormCMSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
