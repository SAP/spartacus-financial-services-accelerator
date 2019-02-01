import { Component, OnInit } from '@angular/core';
import { LoginComponent } from '@spartacus/storefront';

@Component({
  template: '',
})
export class LogoutComponent extends LoginComponent implements OnInit {

  ngOnInit() {
    super.logout();
  }
}
