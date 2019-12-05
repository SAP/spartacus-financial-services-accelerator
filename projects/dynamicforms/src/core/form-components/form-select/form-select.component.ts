import { Component, OnInit } from '@angular/core';
import { FormGenericComponent } from '../form-generic.component';

@Component({
  selector: 'cx-form-select',
  templateUrl: './form-select.component.html',
})
export class FormSelectComponent extends FormGenericComponent
  implements OnInit {
  ngOnInit() {
    if (this.config.depends) {
      this.config.depends.forEach(dependField => {
        this.group.get(dependField).valueChanges.subscribe(val => {
          this.setFormControlValues(val);
        });
      });
    }
    this.setFormControlValues(null);
  }

  setFormControlValues(val: string) {
    if (this.config.jsonField) {
      const nodes = this.config.jsonField.split('.');
      if (val !== null) {
        this.config.options = this.formService.getDropdownValues(nodes, val);
      } else {
        this.config.options = this.formService.setInitialFormControlValues(
          nodes
        );
      }
    }
  }
}
