import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteReviewComponent } from './quote-review.component';

describe('QuoteReviewComponent', () => {
  let component: QuoteReviewComponent;
  let fixture: ComponentFixture<QuoteReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
