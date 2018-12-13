import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'fsa-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent  implements AfterContentInit {
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  ngAfterContentInit() {
    this.panels.toArray()[0].opened = true;
    this.panels.toArray().forEach((panel: PanelComponent) => {
      panel.toggle.subscribe(() => {
        this.openPanel(panel);
      });
    });
  }

  openPanel(panel: PanelComponent) {
    panel.opened === true ? panel.opened = false : panel.opened = true;
  }
}
