import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveProductsComponent } from './active-products.component';

describe('GroupPolicyComponent', () => {
  let component: ActiveProductsComponent;
  let fixture: ComponentFixture<ActiveProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
