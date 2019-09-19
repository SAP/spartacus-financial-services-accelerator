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
    this.setFormControlValues();
  }

  setFormControlValues() {
    if (this.config.apiProvider) {
      const api = this.getAPI();
      this.formService.getValues(api).subscribe(obj => {
        this.config.options = obj;
      });
    }
  }

  getAPI(): string {
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
      return apiConfigUrl;
    }
  }
}

