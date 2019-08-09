import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FieldConfig, FormDefinition } from '../../models/field-config.interface';

@Component({
  exportAs: 'fsa-dynamicForm',
  selector: 'fsa-dynamic-form',
  templateUrl: './dynamic-form.component.html'
})
export class DynamicFormComponent implements OnInit {
  @Input()
  config: FormDefinition;
  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

  allInputs: Array<FieldConfig> = [];
  get changes() { return this.form.valueChanges; }
  get valid() { return this.form.valid; }
  get value() { return this.form.value; }

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.createForm(this.config);
    this.config.formGroups.map( formGroup => {
       formGroup.fieldConfigs.map((inputField) =>  {
        this.allInputs.push(inputField);
        });
    });
  }

  createForm(config) {
    const form = this.fb.group({});
    config.formGroups.forEach(formGroup => {
      const groupName = formGroup.groupName;
      const newGroup = this.fb.group({});
      formGroup.fieldConfigs.forEach(input => {
        input.group = newGroup;
        if (input.type !== 'button' && input.type !== 'title') {
          newGroup.addControl(input.name, this.createControl(input));
        }
      });
      form.addControl(groupName, newGroup );
    });
    return form;
  }

  createControl(config: FieldConfig) {
    const { disabled, validation, value } = config;
    return this.fb.control({ disabled, value }, validation);
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }
}
