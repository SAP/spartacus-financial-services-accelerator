import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureProductNavigationComponent } from './configure-product-navigation.component';

describe('ConfigureProductNavigationComponent', () => {
  let component: ConfigureProductNavigationComponent;
  let fixture: ComponentFixture<ConfigureProductNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ConfigureProductNavigationComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureProductNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
