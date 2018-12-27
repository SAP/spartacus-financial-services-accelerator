import { Component } from '@angular/core';
import { LoginComponent } from "@spartacus/storefront";

@Component({
  templateUrl: './logout.component.html',
})
export class LogoutComponent extends LoginComponent{

  ngOnInit() {
    super.logout();
  }
}
