import { Component, Input } from '@angular/core';

@Component({
  selector: 'fsa-accordion-item',
  templateUrl: './accordion-item.component.html'
})
export class AccordionItemComponent {
  @Input() icon: string;
  @Input() opened = false;
  @Input() title: string;

  onItemClick() {
    this.opened = this.opened === true ? false : true;
  }
}
