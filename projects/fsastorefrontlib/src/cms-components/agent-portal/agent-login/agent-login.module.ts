import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CmsPageGuard, PageLayoutComponent } from '@spartacus/storefront';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard],
    data: {
      cxRoute: 'agentLogin',
      pageLabel: 'agent-portal',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AgentLoginModule { }
