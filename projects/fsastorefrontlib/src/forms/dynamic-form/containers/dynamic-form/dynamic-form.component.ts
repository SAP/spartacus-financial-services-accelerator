import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FSFormService } from '../../form.service';
import {
  FieldConfig,
  FormDefinition,
} from '../../models/field-config.interface';

@Component({
  exportAs: 'fsa-dynamicForm',
  selector: 'fsa-dynamic-form',
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit {
  @Input()
  config: FormDefinition;
  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;

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

  constructor(private formService: FSFormService) {}

  ngOnInit() {
    this.form = this.formService.createForm(this.config);
    this.config.formGroups.map(formGroup => {
      formGroup.fieldConfigs.map(inputField => {
        this.allInputs.push(inputField);
      });
    });
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }
}
