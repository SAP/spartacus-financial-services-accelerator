import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { YFormData } from '@fsa/dynamicforms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { GeneralHelpers } from '../../helpers/helpers';

import {
  FieldConfig,
  FormDefinition,
} from '../../models/form-config.interface';
import { FormBuilderService } from '../../services/builder/form-builder.service';
import { FormDataService } from '../../services/data/form-data.service';
import { DynamicFormsConfig } from '../../config';

@Component({
  exportAs: 'cx-dynamicForm',
  selector: 'cx-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input()
  formData: Observable<YFormData>;
  @Input()
  config: FormDefinition;
  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;
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
    protected formService: FormBuilderService,
    protected formDataService: FormDataService,
    public formConfig: DynamicFormsConfig
  ) {}

  ngOnInit() {
    this.createFormDefinition();
    this.addSubmitEvent();
    if (this.formData) {
      this.subscription.add(
        this.formData
          .pipe(
            map(formData => {
              if (formData.content) {
                this.mapDataToFormControls(JSON.parse(formData.content));
              }
            })
          )
          .subscribe()
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
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
    for (const groupCode of Object.keys(formData)) {
      if (GeneralHelpers.getObjectDepth(formData) === 1) {
        this.form.get(groupCode).setValue(formData[groupCode]);
      } else {
        for (const controlName of Object.keys(formData[groupCode])) {
          this.form
            .get(groupCode)
            .get(controlName)
            .setValue(formData[groupCode][controlName]);
        }
      }
    }
  }

  addSubmitEvent() {
    this.subscription.add(
      this.formDataService
        .getSubmittedForm()
        .pipe(
          map(form => {
            if (
              form &&
              form.content === undefined &&
              this.form &&
              this.value !== undefined &&
              this.valid
            ) {
              this.submit.emit({
                id: form.id,
                refId: form.refId,
                content: this.value,
              });
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
