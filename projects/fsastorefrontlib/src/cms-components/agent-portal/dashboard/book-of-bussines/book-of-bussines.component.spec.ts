import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOfBussinesComponent } from './book-of-bussines.component';

describe('BookOfBussinesComponent', () => {
  let component: BookOfBussinesComponent;
  let fixture: ComponentFixture<BookOfBussinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookOfBussinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOfBussinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
