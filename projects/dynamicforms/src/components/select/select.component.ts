import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../abstract-form.component';

@Component({
  selector: 'cx-select',
  templateUrl: './select.component.html',
})
export class SelectComponent extends AbstractFormComponent implements OnInit {
  ngOnInit() {
    super.ngOnInit();
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
