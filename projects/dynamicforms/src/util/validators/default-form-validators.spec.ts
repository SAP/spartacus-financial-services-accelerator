import { FormControl, FormGroup } from '@angular/forms';
import { DefaultFormValidators } from './default-form-validators';

const field1 = 'field1';
const field2 = 'field2';
const date1 = 'date1';
const date2 = 'date2';
const dateOfBirth = 'dateOfBirth';

describe('FormValidationService', () => {
  let form: FormGroup;

  beforeEach(() => {
    form = new FormGroup({
      field1: new FormControl(),
      field2: new FormControl(),
      dateOfBirth: new FormControl(),
      date1: new FormControl(),
      date2: new FormControl(),
    });
  });

  it('should not return error, when fields match', () => {
    form.get(field1).setValue('fieldValue');
    form.get(field2).setValue('fieldValue');
    expect(DefaultFormValidators.matchFields(field1, field2)(form)).toEqual(
      undefined
    );
  });

  it('should return error, when emails do not match', () => {
    form.get(field1).setValue('fieldValue');
    form.get(field2).setValue('otherValue');
    expect(DefaultFormValidators.matchFields(field1, field2)(form)).toEqual({
      NotEqual: true,
    });
  });

  it('should return error, when person is younger then minimun age', () => {
    form.get(dateOfBirth).setValue('10-10-2015');
    expect(
      DefaultFormValidators.dateOfBirthValidator(18)(form.get(dateOfBirth))
    ).toEqual({ InvalidDate: true });
  });

  it('should not return error, when person is older then minimun age', () => {
    form.get(dateOfBirth).setValue('10-10-2000');
    expect(
      DefaultFormValidators.dateOfBirthValidator(18)(form.get(dateOfBirth))
    ).toEqual(null);
  });

  it('should return error, when field does not contain given value', () => {
    form.get(field1).setValue('testValue');
    expect(
      DefaultFormValidators.shouldContainValue('notExist')(form.get(field1))
    ).toEqual({ valueConflict: true });
  });

  it('should not return error, when field contains given value', () => {
    form.get(field1).setValue('testValue');
    expect(
      DefaultFormValidators.shouldContainValue('test')(form.get(field1))
    ).toEqual(null);
  });

  it('should return error, when field does not match to one of given values', () => {
    form.get(field1).setValue('testValue');
    const allowedValues = ['testValue1', 'testValue2'];
    expect(
      DefaultFormValidators.checkValue(allowedValues)(form.get(field1))
    ).toEqual({ valueConflict: true });
  });

  it('should not return error, when field matches one of given values', () => {
    form.get(field1).setValue('testValue1');
    const allowedValues = ['testValue1', 'testValue2'];
    expect(
      DefaultFormValidators.checkValue(allowedValues)(form.get(field1))
    ).toEqual(null);
  });

  it('should not return error, when field contains at least one letter and number', () => {
    form.get(field1).setValue('testValue1');
    expect(DefaultFormValidators.alphanumeric(form.get(field1))).toEqual(null);
  });

  it('should check field value against regex', () => {
    const numberLetterRegex = /^(?=.*[0-9])[A-Za-z0-9\s]+$/;

    form.get(field1).setValue('testValue1');
    expect(
      DefaultFormValidators.regexValidator(numberLetterRegex)(form.get(field1))
    ).toEqual(null);

    form.get(field1).setValue('testValue');
    expect(
      DefaultFormValidators.regexValidator(numberLetterRegex)(form.get(field1))
    ).toEqual({ InvalidFormat: true });
  });

  it('should not return error, when field contains numbers only', () => {
    form.get(field1).setValue('12345');
    expect(DefaultFormValidators.number(form.get(field1))).toEqual(null);
  });

  it('should check if date comparison condition is satisfied', () => {
    const dateToCompare = new Date('10-10-2020');
    const dateToCompare2 = new Date('03-03-2020');
    const baseDate = new Date('05-05-2020');

    expect(
      DefaultFormValidators.valueComparison(
        baseDate,
        dateToCompare,
        'shouldBeLess'
      )
    ).toEqual(null);

    expect(
      DefaultFormValidators.valueComparison(
        baseDate,
        dateToCompare,
        'shouldBeGreater'
      )
    ).toEqual({ valueConflict: true });

    expect(
      DefaultFormValidators.valueComparison(
        baseDate,
        dateToCompare2,
        'shouldBeLess'
      )
    ).toEqual({ valueConflict: true });

    expect(
      DefaultFormValidators.valueComparison(
        baseDate,
        dateToCompare2,
        'shouldBeGreater'
      )
    ).toEqual(null);
  });

  it('should compare date in past with current date', () => {
    const dateInPast = new Date();
    dateInPast.setFullYear(dateInPast.getFullYear() - 1);
    form.get(date1).setValue(dateInPast);
    expect(
      DefaultFormValidators.compareToCurrentDate('shouldBeLess')(
        form.get(date1)
      )
    ).toEqual(null);

    expect(
      DefaultFormValidators.compareToCurrentDate('shouldBeLessOrEqual')(
        form.get(date1)
      )
    ).toEqual(null);

    expect(
      DefaultFormValidators.compareToCurrentDate('shouldBeEqual')(
        form.get(date1)
      )
    ).toEqual({ InvalidDate: true });

    expect(
      DefaultFormValidators.compareToCurrentDate('shouldBeGreater')(
        form.get(date1)
      )
    ).toEqual({ InvalidDate: true });

    expect(
      DefaultFormValidators.compareToCurrentDate('shouldBeGreaterOrEqual')(
        form.get(date1)
      )
    ).toEqual({ InvalidDate: true });
  });

  it('should compare date in future with current date', () => {
    const dateInFuture = new Date();
    dateInFuture.setFullYear(dateInFuture.getFullYear() + 1);
    form.get(date1).setValue(dateInFuture);
    expect(
      DefaultFormValidators.compareToCurrentDate('shouldBeLess')(
        form.get(date1)
      )
    ).toEqual({ InvalidDate: true });

    expect(
      DefaultFormValidators.compareToCurrentDate('shouldBeLessOrEqual')(
        form.get(date1)
      )
    ).toEqual({ InvalidDate: true });

    expect(
      DefaultFormValidators.compareToCurrentDate('shouldBeEqual')(
        form.get(date1)
      )
    ).toEqual({ InvalidDate: true });

    expect(
      DefaultFormValidators.compareToCurrentDate('shouldBeGreater')(
        form.get(date1)
      )
    ).toEqual(null);

    expect(
      DefaultFormValidators.compareToCurrentDate('shouldBeGreaterOrEqual')(
        form.get(date1)
      )
    ).toEqual(null);
  });

  it('should compare to dates control', () => {
    form.get(date1).setValue('10-10-2015');
    form.get(date2).setValue('10-10-2016');

    expect(
      DefaultFormValidators.compareDates(date2, 'shouldBeLess')(form.get(date1))
    ).toEqual({ valueConflict: true });

    expect(
      DefaultFormValidators.compareDates(
        date2,
        'shouldBeGreater'
      )(form.get(date1))
    ).toEqual(null);
  });

  it('should compare numbers', () => {
    form.get(field1).setValue(10);
    form.get(field2).setValue(11);

    expect(
      DefaultFormValidators.compareNumbers(
        field2,
        'shouldBeLess'
      )(form.get(field1))
    ).toEqual(null);

    expect(
      DefaultFormValidators.compareNumbers(
        field2,
        'shouldBeGreater'
      )(form.get(field1))
    ).toEqual({ valueConflict: true });
  });

  it('should age and date of birth fields', () => {
    form.get(field1).setValue(15);
    form.get(dateOfBirth).setValue('10-10-2015');

    expect(
      DefaultFormValidators.compareAgeToDOB(
        dateOfBirth,
        'shouldBeLess'
      )(form.get(field1))
    ).toEqual(null);

    expect(
      DefaultFormValidators.compareAgeToDOB(
        dateOfBirth,
        'shouldBeGreater'
      )(form.get(field1))
    ).toEqual({ valueConflict: true });

    expect(
      DefaultFormValidators.compareDOBtoAge(
        field1,
        'shouldBeLess'
      )(form.get(dateOfBirth))
    ).toEqual({ valueConflict: true });

    expect(
      DefaultFormValidators.compareDOBtoAge(
        field1,
        'shouldBeGreater'
      )(form.get(dateOfBirth))
    ).toEqual(null);
  });

  it('should return required error, when field has no value', () => {
    form.get(field1).setValue(' ');
    expect(DefaultFormValidators.required(form.get(field1))).toEqual({
      required: true,
    });
    form.get(field2).setValue('');
    expect(DefaultFormValidators.required(form.get(field2))).toEqual({
      required: true,
    });
  });
});
