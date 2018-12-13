import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ConfigurableRoutesService } from '@spartacus/core';
import { StorefrontComponent } from './storefront.component';

@Component({
  selector: 'cx-header',
  template: ''
})
class MockHeaderComponent {}

@Component({
  selector: 'cx-global-message',
  template: ''
})
class MockGlobalMessagerComponent {}

@Component({
  selector: 'cx-footer',
  template: ''
})
class MockFooterComponent {}

class MockConfigurableRoutesService {
  changeLanguage() {}
}

describe('StorefrontComponent', () => {
  let component: StorefrontComponent;
  let fixture: ComponentFixture<StorefrontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        StorefrontComponent,
        MockHeaderComponent,
        MockGlobalMessagerComponent,
        MockFooterComponent
      ],
      providers: [
        {
          provide: ConfigurableRoutesService,
          useClass: MockConfigurableRoutesService
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorefrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
