import { Component, OnInit } from '@angular/core';
import { FormGenericComponent } from '../form-generic.component';
import { OccMockFormService } from '../../../../../../../occ/form/occ-mock-form.service';

@Component({
  selector: 'fsa-form-select',
  templateUrl: './form-select.component.html'

})
export class FormSelectComponent extends FormGenericComponent implements OnInit {

  constructor(
    protected formService: OccMockFormService
  ) {
    super();
  }
  ngOnInit() {
    if (this.config.depends) {
      this.config.depends.forEach((dependField) => {
        this.group.get(dependField).valueChanges.subscribe(val => {
          this.setFormControlValues();
        });
      });
    }
    //this.getValuesFromAPI();
  }

  setFormControlValues() {
    // if (this.config.jsonField) {
    //   const nodes = this.config.jsonField.split('.');
    //   if (val !== null) {
    //     this.config.options = this.formService.getDropdownValues(nodes, val);
    //   } else {
    //     this.config.options = this.formService.setInitialFormControlValues(nodes);
    //   }
    // }
    if (this.config.apiProvider) {
      this.config.options = this.getValuesFromAPI();

    }
  }

  getValuesFromAPI(): string[] {
    if (this.config.apiProvider) {
      let apiConfigUrl = this.config.apiProvider;
      const dynamicParams = apiConfigUrl.match(/\[.*?\]/g);
      if (dynamicParams) {
        dynamicParams.forEach(param => {
          const control = this.group.get(param.substring(1, param.length - 1));
          if (control) {
            apiConfigUrl = apiConfigUrl.replace(param, control.value);
            console.log(apiConfigUrl);
          }
        });
      }
      return ['123', '456'];
    }
  }
}

