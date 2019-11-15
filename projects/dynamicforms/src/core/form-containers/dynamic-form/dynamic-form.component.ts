import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  FieldConfig,
  FormDefinition,
} from '../../models/field-config.interface';
import { FormBuilderService } from '../../services/builder/form-builder.service';
import { FormDataService } from '../../services/data/form-data.service';
import { Subscription } from 'rxjs';

@Component({
  exportAs: 'cx-dynamicForm',
  selector: 'cx-dynamic-form',
  templateUrl: './dynamic-form.component.html',
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  private subscription = new Subscription();

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

    this.subscription.add(
      this.formDataService.getSubmittedData().subscribe(data => {
        if (data !== undefined && this.value !== undefined) {
          this.submit.emit(this.value);
        }
      })
    );
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.submit.emit(this.value);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
