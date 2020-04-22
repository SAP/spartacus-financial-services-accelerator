import { FormHelpers } from './form-helpers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

describe('FormHelpers', () => {
  const formBuilder = new FormBuilder();
  let testForm: FormGroup;
  const formGroupParent = 'formGroupParent';
  const formGroupTest = 'formGroupTest';
  const formGroupRadio = 'formGroupRadio';
  const dependentField = 'dependentField';
  const radioInput = 'radioInput';
  const formGroupDependent = 'formGroupDependent';
  let formGroupDependentControl;
  let formGroupParentControl;
  let formGroupTestControl;

  beforeEach(() => {
    testForm = formBuilder.group({
      formGroupRadio: formBuilder.group({
        radioInput: formBuilder.control(
          'radioOptionValue',
          FormHelpers.shouldEnableTargetGroup({
            0: [formGroupParent, formGroupTest],
            1: [formGroupTest],
          })
        ),
      }),
      formGroupTest: formBuilder.group({
        parentInput: 'test',
      }),
      formGroupParent: formBuilder.group({
        parentInput: 'parentValue',
        formGroup: formBuilder.group({
          input: formBuilder.control('inputValue', [
            Validators.required,
            FormHelpers.shouldEnableDependentGroup([formGroupDependent]),
          ]),
        }),
        formGroupDependent: formBuilder.group({
          childInput: formBuilder.control('childInputValue', [
            Validators.required,
            FormHelpers.shouldEnableDependentField([dependentField]),
          ]),
          dependentField: formBuilder.control({
            value: dependentField,
            disabled: true,
          }),
        }),
      }),
    });
    formGroupDependentControl = testForm
      .get(formGroupParent)
      .get(formGroupDependent);
    formGroupParentControl = testForm.get(formGroupParent);
    formGroupTestControl = testForm.get(formGroupTest);
  });

  describe('EnableDependentField', () => {
    it('should EnableDependentField ', () => {
      expect(formGroupDependentControl.get(dependentField).disabled).toBe(true);
      formGroupDependentControl.get('childInput').setValue('2');
      expect(formGroupDependentControl.get(dependentField).disabled).toBe(
        false
      );
    });
    it('should not EnableDependentField ', () => {
      expect(formGroupDependentControl.get(dependentField).disabled).toBe(true);
      formGroupDependentControl.get('childInput').setValue('0');
      expect(formGroupDependentControl.get(dependentField).disabled).toBe(true);
    });
  });

  describe('EnableDependentGroup', () => {
    it('should EnableDependentGroup', () => {
      formGroupDependentControl.disable();
      expect(formGroupDependentControl.disabled).toBe(true);
      formGroupParentControl
        .get('formGroup')
        .get('input')
        .setValue('2');
      expect(formGroupDependentControl.disabled).toBe(false);
    });
    it('should not EnableDependentGroup', () => {
      formGroupDependentControl.disable();
      expect(formGroupDependentControl.disabled).toBe(true);
      formGroupParentControl
        .get('formGroup')
        .get('input')
        .setValue('0');
      expect(formGroupDependentControl.disabled).toBe(true);
    });
  });

  describe('EnableTargetGroup', () => {
    it('should enable 2 target groups', () => {
      formGroupParentControl.disable();
      formGroupTestControl.disable();
      expect(formGroupParentControl.disabled).toBe(true);
      expect(formGroupTestControl.disabled).toBe(true);
      testForm
        .get(formGroupRadio)
        .get(radioInput)
        .setValue('0');
      expect(formGroupParentControl.disabled).toBe(false);
      expect(formGroupTestControl.disabled).toBe(false);
    });

    it('should enable 1 target group', () => {
      formGroupParentControl.disable();
      formGroupTestControl.disable();
      expect(formGroupParentControl.disabled).toBe(true);
      expect(formGroupTestControl.disabled).toBe(true);
      testForm
        .get(formGroupRadio)
        .get(radioInput)
        .setValue('1');
      expect(formGroupParentControl.disabled).toBe(true);
      expect(formGroupTestControl.disabled).toBe(false);
    });
  });
});
