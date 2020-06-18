import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupContentComponent } from './popup-content.component';

describe('PopupContentComponent', () => {
  let component: PopupContentComponent;
  let fixture: ComponentFixture<PopupContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupContentComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
