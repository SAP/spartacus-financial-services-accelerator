import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FieldConfig,
  FormDefinition,
} from '../../models/field-config.interface';
import { FormBuilderService } from '../../services/builder/form-builder.service';

import { FormDataService } from '../../services/data/form-data.service';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { YFormData } from 'dynamicforms/src/core';

@Component({
  exportAs: 'cx-dynamicForm',
  selector: 'cx-dynamic-form',
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit {
  @Input()
  formData: Observable<YFormData>;
  @Input()
  config: FormDefinition;
  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  form: any;
  subscription = new Subscription();

  allInputs: Array<FieldConfig> = [];

  get changes() {
    return this.form.valueChanges;
  }
  get valid() {
    return this.form.valid;
  }
  get value() {
    return this.form.value;
  }

  constructor(
    private formService: FormBuilderService,
    private formDataService: FormDataService
  ) {}

  ngOnInit() {
    this.createFormDefinition();
    this.addSubmitEvent();
    if (this.formData) {
      this.formData.subscribe( formData => {
        this.mapDataToFormControls(JSON.parse(formData.content));
      });
    }
  }

  createFormDefinition() {
    if (this.config) {
      this.form = this.formService.createForm(this.config);
      this.config.formGroups.map(formGroup => {
        formGroup.fieldConfigs.map(inputField => {
          this.allInputs.push(inputField);
        });
      });
    }
  }
  mapDataToFormControls(formData) {
    for (const groupName of Object.keys(formData)) {
      const groupData = formData[groupName];
      for (const controlName of Object.keys(groupData)) {
        this.form.controls[groupName].controls[controlName].setValue(groupData[controlName]);
      }
    }
  }
  addSubmitEvent() {
    this.subscription.add(
      this.formDataService
        .getSubmittedForm()
        .pipe(
          map(submitted => {
            if (!submitted && this.value !== undefined && this.valid) {
              this.submit.emit(this.value);
            }
          })
        )
        .subscribe()
    );
  }
  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }
}
