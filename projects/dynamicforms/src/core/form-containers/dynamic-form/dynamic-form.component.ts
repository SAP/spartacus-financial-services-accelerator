import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DynamicFormsConfig } from '../../config/form-config';
import { GeneralHelpers } from '../../helpers/helpers';
import { FormDefinition } from '../../models/form-config.interface';
import { FormBuilderService } from '../../services/builder/form-builder.service';
import { FormDataService } from '../../services/data/form-data.service';
import { YFormData } from './../../models/form-occ.models';
import { FormComponentService } from '../../../components/form-component.service';
import { ViewportScroller } from '@angular/common';

@Component({
  exportAs: 'cx-dynamicForm',
  selector: 'cx-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicFormComponent
  implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @Input()
  formData: Observable<YFormData>;
  @Input()
  config: FormDefinition;
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output()
  submit: EventEmitter<any> = new EventEmitter<any>();

  populatedInvalid$: Observable<boolean>;
  form: FormGroup;
  subscription = new Subscription();

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
    protected changeDetectorRef: ChangeDetectorRef,
    protected formService: FormBuilderService,
    protected formDataService: FormDataService,
    protected formComponentService: FormComponentService,
    protected renderer: Renderer2,
    protected viewportScroller: ViewportScroller,
    public formConfig: DynamicFormsConfig
  ) {}
  @ViewChild('wizardForm') wizardForm: ElementRef<HTMLElement>;
  visibleElements: Element[] = [];
  children: Element[] = [];

  ngOnInit() {
    this.populatedInvalid$ = this.formComponentService.isPopulatedFormInvalid;
    if (this.config) {
      this.form = this.formService.createForm(this.config);
    }
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

  ngAfterViewInit(): void {
    this.children = Array.from(this.wizardForm.nativeElement.children);
    this.visibleElements = this.children.filter(item => !item['hidden']);
    this.renderer.removeClass(
      this.wizardForm.nativeElement.children[0],
      'd-none'
    );
  }

  ngAfterViewChecked() {
    this.visibleElements = this.children.filter(item => !item['hidden']);
    console.log(this.visibleElements);
  }

  previousSection(wizardFormGroup: HTMLElement) {
    const availableGroup = this.visibleElements.findIndex(
      elem =>
        elem.firstChild.textContent === wizardFormGroup.firstChild.textContent
    );
    this.viewportScroller.scrollToPosition([0, 0]);
    if (availableGroup - 1 > -1) {
      this.renderer.removeClass(
        this.visibleElements[availableGroup - 1],
        'd-none'
      );
      this.renderer.addClass(this.visibleElements[availableGroup], 'd-none');
    }
  }

  nextSection(wizardFormGroup: HTMLElement) {
    const availableGroup = this.visibleElements.findIndex(
      elem =>
        elem.firstChild.textContent === wizardFormGroup.firstChild.textContent
    );
    this.viewportScroller.scrollToPosition([0, 0]);
    if (this.visibleElements.length > availableGroup + 1) {
      this.renderer.removeClass(
        this.visibleElements[availableGroup + 1],
        'd-none'
      );
      this.renderer.addClass(this.visibleElements[availableGroup], 'd-none');
    }
  }

  mapDataToFormControls(formData) {
    for (const groupCode of Object.keys(formData)) {
      if (
        this.form.get(groupCode) &&
        GeneralHelpers.getObjectDepth(formData[groupCode]) === 0
      ) {
        this.form.get(groupCode).setValue(formData[groupCode]);
      } else {
        for (const controlName of Object.keys(formData[groupCode])) {
          const formGroup = this.form.get(groupCode);
          if (formGroup && formData[groupCode][controlName] !== ' ') {
            if (formGroup.get(controlName)) {
              formGroup
                .get(controlName)
                .setValue(formData[groupCode][controlName]);
            } else {
              formGroup.setValue(formData[groupCode][controlName]);
            }
          }
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
            if (this.checkInvalidControls(form)) {
              this.formComponentService.isPopulatedFormInvalidSource.next(true);
              this.markInvalidControls(this.form);
              this.changeDetectorRef.detectChanges();
            } else if (
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

  markInvalidControls(formGroup: FormGroup) {
    for (const key of Object.keys(formGroup.controls)) {
      const formControl = formGroup.get(key);
      if (formControl instanceof FormGroup) {
        this.markInvalidControls(formControl);
      } else {
        const control = <FormControl>formControl;
        if (!control.valid) {
          control.markAsTouched({ onlySelf: true });
        }
      }
    }
  }

  private checkInvalidControls(formData: YFormData): boolean {
    return !!(formData && !this.valid);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
