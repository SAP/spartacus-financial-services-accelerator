import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([], {
      anchorScrolling: 'enabled',
      relativeLinkResolution: 'corrected',
      initialNavigation: 'enabledNonBlocking',
    }),
  ],
})
export class AppRoutingModule {}
