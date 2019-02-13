import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOptionsPageLayoutComponent } from './add-options-page-layout.component';
import { AddOptionsModule } from 'projects/fsastorefrontlib/src/lib/my-account';


@NgModule({
  imports: [CommonModule, AddOptionsModule],
  declarations: [AddOptionsPageLayoutComponent],
  exports: [AddOptionsPageLayoutComponent],
  providers: [
  ]
})
export class AddOptionsPageLayoutModule { }
