import { Component } from '@angular/core';
import { LoginComponent } from '@spartacus/storefront';

@Component({
  template: '',
})
export class LogoutComponent extends LoginComponent{

  ngOnInit() {
    super.logout();
  }
}
