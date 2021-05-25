import { Component, DebugElement, ElementRef, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import { NavigationNode } from '@spartacus/storefront';
import { FSNavigationUIComponent } from './navigation-ui.component';

@Component({
  // tslint:disable
  selector: 'cx-icon',
  template: '',
})
class MockIconComponent {
  @Input() type: string;
}

@Component({
  selector: 'cx-generic-link',
  template: '',
})
class MockGenericLinkComponent {
  @Input() url: string | any[];
  @Input() target: string;
  @Input() title: string;
}

const mockNode: NavigationNode = {
  title: 'test',
  children: [
    {
      title: 'Root 1',
      url: '/root-1',
      children: [
        {
          title: 'Child 1',
          children: [
            {
              title: 'Sub child 1',
              children: [
                {
                  title: 'Sub sub child 1',
                  url: '/sub-sub-child-1',
                },
                {
                  title: 'Sub sub child 1',
                  url: '/sub-sub-child-1',
                },
                {
                  title: 'Sub sub child 1',
                  url: '/sub-sub-child-1',
                },
                {
                  title: 'Sub sub child 1',
                  url: '/sub-sub-child-1',
                },
              ],
            },
          ],
        },
        {
          title: 'Child 2',
          url: '/child-2',
        },
      ],
    },
    {
      title: 'Root 2',
      url: '/root-2',
    },
  ],
};

describe('FSNavigation UI Component', () => {
  let fixture: ComponentFixture<FSNavigationUIComponent>;
  let navigationComponent: FSNavigationUIComponent;
  let element: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, I18nTestingModule],
      declarations: [
        FSNavigationUIComponent,
        MockIconComponent,
        MockGenericLinkComponent,
      ],
      providers: [],
    }).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(FSNavigationUIComponent);
    navigationComponent = fixture.debugElement.componentInstance;
    element = fixture.debugElement;
    navigationComponent.node = mockNode;
  });

  describe('Test adding/removing wrapper class', () => {
    it('should remove was-opened class on wrapper element', () => {
      fixture.detectChanges();
      const event = jasmine.createSpyObj('event', ['stopPropagation']);
      navigationComponent.setClassOnWrapper(event);
      const wrapper: ElementRef = element.query(By.css('.was-opened'));
      navigationComponent.removeClassOnWrapper(event);
      const el: HTMLElement = wrapper.nativeElement;
      const elClass = el.getAttribute('class');
      expect(elClass).not.toContain('was-opened');
    });

    it('should not remove was-opened class on wrapper element', () => {
      fixture.detectChanges();
      const event = jasmine.createSpyObj('event', ['stopPropagation']);
      const wrapper: ElementRef = element.query(By.css('.wrapper'));
      navigationComponent.removeClassOnWrapper(event);
      const el: HTMLElement = wrapper.nativeElement;
      const elClass = el.getAttribute('class');
      expect(elClass).not.toContain('was-opened');
    });
  });
});
