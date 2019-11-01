import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionItemComponent } from './accordion-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [AccordionItemComponent],
  exports: [AccordionItemComponent],
  entryComponents: [AccordionItemComponent],
})
export class AccordionModule {}
