import { NgModule } from '@angular/core';
import { LogoutComponent } from './logout.component';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard, CmsPageGuards } from "@spartacus/storefront";

const routes: Routes = [
  {
    path: 'logout',
    canActivate: [CmsPageGuards, AuthGuard],
    component: LogoutComponent,
    data: { pageLabel: 'login' },
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [LogoutComponent]
})
export class LogoutModule { }

