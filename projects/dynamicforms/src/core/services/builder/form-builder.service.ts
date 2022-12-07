import { Injectable } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { UserAccountFacade } from '@spartacus/user/account/root';
import { FormValidationService } from '../form-validation/form-validation.service';
import { FieldConfig } from './../../models/form-config.interface';
import { FieldDependencyResolverService } from './../form-dependencies/field-dependency-resolver.service';

@Injectable()
export class FormBuilderService {
  constructor(
    protected fb: UntypedFormBuilder,
    protected formValidationService: FormValidationService,
    protected fieldDependencyResolverService: FieldDependencyResolverService,
    protected userAccountFacade: UserAccountFacade
  ) {}

  createForm(config) {
    const form = this.fb.group({});
    config.formGroups.forEach(formGroup => {
      const controlGroup =
        formGroup.groupCode !== undefined ? this.fb.group({}) : form;
      if (formGroup.groupCode !== undefined) {
        form.addControl(formGroup.groupCode, controlGroup);
      }

      formGroup.fieldConfigs.forEach(fieldConfig => {
        fieldConfig.group = controlGroup;
        const fieldControl = this.createControl(fieldConfig);
        controlGroup.addControl(fieldConfig.name, fieldControl);
        if (fieldConfig.dependsOn) {
          this.fieldDependencyResolverService.resolveFormControlDependencies(
            fieldConfig,
            fieldControl,
            form
          );
        }
        this.enableFieldsForSellerUserGroup(fieldControl, fieldConfig);
      });
      if (formGroup.dependsOn) {
        this.fieldDependencyResolverService.resolveFormControlDependencies(
          formGroup,
          controlGroup,
          form
        );
      }
    });
    return form;
  }

  createControl(fieldConfig: FieldConfig) {
    const { disabled, value } = fieldConfig;
    const validations = this.formValidationService.getValidatorsForField(
      fieldConfig
    );
    return this.fb.control({ disabled, value }, validations);
  }

  /**
   * Method is used to enable all form controls when currently logged in customer is part of seller user group.
   * This is temporary solution. Control property should be defined in the form defintion's JSON metadata.
   */
  private enableFieldsForSellerUserGroup(
    fieldControl: UntypedFormControl,
    fieldConfig
  ) {
    this.userAccountFacade
      .get()
      .subscribe(user => {
        if ((<any>user)?.roles.includes('sellergroup')) {
          fieldControl.enable();
          fieldConfig.readonly = false;
        }
      })
      .unsubscribe();
  }
}
