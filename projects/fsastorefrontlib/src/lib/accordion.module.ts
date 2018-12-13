import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionComponent } from './accordion/accordion.component';
import { PanelComponent } from './panel/panel.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AccordionComponent, PanelComponent],
  exports: [AccordionComponent, PanelComponent],
  entryComponents: [AccordionComponent, PanelComponent],
})
export class AccordionModule { }
