import { NgModule } from '@angular/core';
import { SortByNamePipe } from './sortByName.pipe';

@NgModule({
  declarations: [SortByNamePipe],
  exports: [SortByNamePipe],
  providers: [SortByNamePipe],
})
export class SortModule {}
