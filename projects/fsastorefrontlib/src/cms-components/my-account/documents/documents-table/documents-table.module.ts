import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { DocumentsTableComponent } from './documents-table.component';

@NgModule({
  imports: [CommonModule, I18nModule],
  declarations: [DocumentsTableComponent],
  exports: [DocumentsTableComponent],
})
export class DocumentsTableModule {}
