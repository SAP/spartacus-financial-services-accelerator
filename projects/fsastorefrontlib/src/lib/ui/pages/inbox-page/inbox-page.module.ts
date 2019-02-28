import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CmsPageGuards } from '@spartacus/storefront';
import { AuthGuard } from '@spartacus/core';
import { InboxPageComponent } from './inbox-page.component';
import { InboxPageLayoutModule } from '../../layout/inbox-page-layout/inbox-page-layout.module';

const routes: Routes = [
  {
    path: 'my-account/inbox',
    canActivate: [AuthGuard, CmsPageGuards],
    component: InboxPageComponent,
    data: { pageLabel: 'inbox' }
  }
];

@NgModule({
  imports: [
    CommonModule,
    InboxPageLayoutModule,
    RouterModule.forChild(routes)
  ],
  declarations: [InboxPageComponent],
  exports: [InboxPageComponent]
})
export class InboxPageModule { }
