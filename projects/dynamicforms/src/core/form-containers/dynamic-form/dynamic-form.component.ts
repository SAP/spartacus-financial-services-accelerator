import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FieldConfig,
  FormDefinition,
} from '../../models/field-config.interface';
import { FormBuilderService } from '../../services/builder/form-builder.service';
import { FormDataService } from '../../services/data/form-data.service';

@Component({
  exportAs: 'cx-dynamicForm',
  selector: 'cx-dynamic-form',
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit {
  private formId: string;
  private formData = {};
  @Input()
  config: FormDefinition;
  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();
  form: any;

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
    protected formDataService: FormDataService
  ) {}

  ngOnInit() {
    if (this.config) {
      this.form = this.formService.createForm(this.config);
      this.config.formGroups.map(formGroup => {
        formGroup.fieldConfigs.map(inputField => {
          this.allInputs.push(inputField);
        });
      });
    }
    this.formId =  sessionStorage.getItem( this.config.formId );
    if (this.formId) {
      this.formDataService.getFormData(this.formId).subscribe( data => {
        // console.log(JSON.parse(data.content));
        this.mapDataToFormControls(JSON.parse(data.content))
      });
    }
    this.form.updateValueAndValidity();
  }
  mapDataToFormControls(formData) {
    console.log(formData);
    for (let groupName of Object.keys(formData)) {
      let groupData = formData[groupName];
      // console.log(groupData)
      for (let controlName of Object.keys(groupData)) {
        // console.log(groupData[controlName]);
        // console.log(this.form.controls[groupName].controls[controlName]);
        this.form.controls[groupName].controls[controlName].setValue(groupData[controlName], {onlySelf: false, emitEvent: true});
        // console.log( this.form.controls[groupName].controls[controlName].value );
      }

      // console.log(this.form.controls[groupName].controls);
      // console.log(groupName);
      // console.log(groupData);
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }
}
