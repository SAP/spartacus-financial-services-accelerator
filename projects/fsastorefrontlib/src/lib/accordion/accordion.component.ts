import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'fsa-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent  implements AfterContentInit {
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  ngAfterContentInit() {
    // Open the first panel
    this.panels.toArray()[0].opened = true;
    // Loop through all panels
    this.panels.toArray().forEach((panel: PanelComponent) => {
      // subscribe panel toggle event
      panel.toggle.subscribe(() => {
        // Open the panel
        this.openPanel(panel);
      });
    });
  }

  openPanel(panel: PanelComponent) {
    console.log(panel);
    // close all panels
    this.panels.toArray().forEach(p => p.opened = false);
    // open the selected panel
    panel.opened = true;
    console.log(panel.opened);
  }
}
