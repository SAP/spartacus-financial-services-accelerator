import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFeatureComponent } from './category-feature.component';

describe('CategoryFeatureComponent', () => {
  let component: CategoryFeatureComponent;
  let fixture: ComponentFixture<CategoryFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryFeatureComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
