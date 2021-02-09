import { NgModule } from '@angular/core';
import { SortByProductNamePipe } from './sortByProductName.pipe';

@NgModule({
  declarations: [SortByProductNamePipe],
  exports: [SortByProductNamePipe],
  providers: [SortByProductNamePipe],
})
export class SortModule {}
