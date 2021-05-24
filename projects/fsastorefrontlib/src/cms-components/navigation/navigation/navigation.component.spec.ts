import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CmsNavigationComponent } from '@spartacus/core';
import {
  CmsComponentData,
  NavigationNode,
  NavigationService,
} from '@spartacus/storefront';
import { of } from 'rxjs';

import { FSNavigationComponent } from './navigation.component';

import createSpy = jasmine.createSpy;

@Component({
  selector: 'cx-fs-navigation-ui',
  template: '',
})
class MockNavigationUIComponent {
  @Input()
  dropdownMode = 'list';
  @Input()
  node: NavigationNode;
}

const mockCmsComponentData = <CmsNavigationComponent>{
  styleClass: 'footer-styling',
};

const MockCmsNavigationComponent = <CmsComponentData<any>>{
  data$: of(mockCmsComponentData),
};

describe('CmsNavigationComponent', () => {
  let navigationComponent: FSNavigationComponent;
  let fixture: ComponentFixture<FSNavigationComponent>;
  let element: DebugElement;

  const mockNavigationService = {
    createNavigation: createSpy().and.returnValue(of(null)),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: NavigationService,
            useValue: mockNavigationService,
          },
          {
            provide: CmsComponentData,
            useValue: MockCmsNavigationComponent,
          },
        ],
        declarations: [FSNavigationComponent, MockNavigationUIComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FSNavigationComponent);
    navigationComponent = fixture.componentInstance;
    element = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(navigationComponent).toBeTruthy();
  });

  it('should add the component styleClass', () => {
    const navigationUI = element.query(By.css('cx-navigation-ui'));
    expect(navigationUI.nativeElement.classList).toContain('footer-styling');
  });
});
