import { Component } from '@angular/core';
import { AbstractOptionsComponent } from '../abstract-options/abstract-options.component';

@Component({
  selector: 'cx-radio',
  templateUrl: './radio.component.html',
})
export class RadioComponent extends AbstractOptionsComponent {
  ngOnInit() {
    super.ngOnInit();
    if (this.config.selected) {
      this.config.options.forEach(el => {
        this.group.get(this.config.name).setValue(el.name);
      });
    }
  }
}
