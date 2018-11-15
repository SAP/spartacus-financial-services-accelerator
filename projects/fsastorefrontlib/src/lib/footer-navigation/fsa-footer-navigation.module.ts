import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FsaFooterNavigationComponent } from './fsa-footer-navigation.component';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [FsaFooterNavigationComponent],
  entryComponents: [FsaFooterNavigationComponent],
  exports: [FsaFooterNavigationComponent]
})
export class FsaFooterNavigationModule {}
