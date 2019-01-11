import { Component, Input } from '@angular/core';

@Component({
  selector: 'fsa-accordion-item',
  templateUrl: './accordion-item.component.html'
})
export class AccordionItemComponent {
  @Input() opened = false;
  @Input() title: string;

  onItemClick() {
    this.opened === true ? this.opened = false : this.opened = true;
  }
}
