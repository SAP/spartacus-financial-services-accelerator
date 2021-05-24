import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavigationUIComponent } from '@spartacus/storefront';
import { Router } from '@angular/router';

@Component({
  selector: 'cx-fs-navigation-ui',
  templateUrl: './navigation-ui.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FSNavigationUIComponent extends NavigationUIComponent {
  @ViewChild('wrapper') wrapper: ElementRef;

  constructor(
    router: Router,
    protected renderer2: Renderer2,
    elemRef: ElementRef
  ) {
    super(router, renderer2, elemRef);
  }

  setClassOnWrapper(event): void {
    if (!this.wrapper.nativeElement.classList.contains('was-opened')) {
      this.renderer2.addClass(this.wrapper.nativeElement, 'was-opened');
    }
    event.stopPropagation();
  }
  removeClassOnWrapper(event): void {
    const wrapper = this.wrapper.nativeElement;
    if (wrapper.classList.contains('was-opened')) {
      this.renderer2.removeClass(wrapper, 'was-opened');
    }
    event.stopPropagation();
  }
}
