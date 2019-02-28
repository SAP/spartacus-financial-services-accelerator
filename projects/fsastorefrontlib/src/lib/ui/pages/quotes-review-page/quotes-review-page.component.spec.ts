import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesReviewPageComponent } from './quotes-review-page.component';

describe('QuotesReviewPageComponent', () => {
  let component: QuotesReviewPageComponent;
  let fixture: ComponentFixture<QuotesReviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuotesReviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotesReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
