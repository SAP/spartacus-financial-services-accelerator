import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule } from '@spartacus/storefront';
import { DocumentsTableComponent } from './documents-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    UrlModule,
    RouterModule,
    IconModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [DocumentsTableComponent],
  exports: [DocumentsTableComponent],
})
export class DocumentsTableModule {}
