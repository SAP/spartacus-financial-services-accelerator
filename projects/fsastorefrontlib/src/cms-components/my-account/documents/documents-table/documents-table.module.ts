import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { DocumentsTableComponent } from './documents-table.component';

@NgModule({
  imports: [CommonModule, I18nModule, UrlModule, RouterModule],
  declarations: [DocumentsTableComponent],
  exports: [DocumentsTableComponent],
})
export class DocumentsTableModule {}
