import { Component, OnInit } from '@angular/core';
import { FormGenericComponent } from '../form-generic.component';
import { MockFormService } from '../../../../../../../occ/form/mock-form.service';

@Component({
  selector: 'fsa-form-select',
  templateUrl: './form-select.component.html'

})
export class FormSelectComponent extends FormGenericComponent  implements OnInit {
  options: any [];

  constructor(
    protected formService: MockFormService
  ) {
    super();
  }
  ngOnInit() {
    if (this.config.depends) {
      this.config.depends.forEach((dependField) => {
        this.group.get(dependField).valueChanges.subscribe(val => {
          this.setFormControlValues(val);
        });
      });
    }
    this.setFormControlValues(null);
  }

  setFormControlValues(val: string) {
    if (this.config.jsonField) {
      const array = [];
      const nodes = this.config.jsonField.split('.');
      if (val !== null) {
        this.formService.getDropdownValues(array, nodes, val);
      } else {
        this.formService.setInitialFormControlValues(array, nodes);
      }
      this.options = array;
    }
  }
}

