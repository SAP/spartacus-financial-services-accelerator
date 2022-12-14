import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import {
  HamburgerMenuService,
  NavigationUIComponent,
} from '@spartacus/storefront';
import { Router } from '@angular/router';
import { WindowRef } from '@spartacus/core';

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
    elemRef: ElementRef,
    protected hamburgerMenuService: HamburgerMenuService, 
    protected winRef: WindowRef
  ) {
    super(router, renderer2, elemRef, hamburgerMenuService, winRef);
  }
  setClassOnWrapper(event: UIEvent): void {
    if (!this.wrapper.nativeElement.classList.contains('was-opened')) {
      this.renderer2.addClass(this.wrapper.nativeElement, 'was-opened');
    }
    event.stopPropagation();
  }
  removeClassOnWrapper(event: UIEvent): void {
    if (this.wrapper.nativeElement.classList.contains('was-opened')) {
      this.renderer2.removeClass(this.wrapper.nativeElement, 'was-opened');
    }
    event.stopPropagation();
  }
}
