import { Component } from '@angular/core';
import { AbstractOptionsComponent } from '../abstract-options/abstract-options.component';
import { FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent extends AbstractOptionsComponent {
  checkBoxArray: FormArray;
  checkedItems$: Observable<any>;

  ngOnInit() {
    super.ngOnInit();
    this.checkBoxArray = this.initializeFormArray(this.config.name);
    this.checkedItems$ = this.checkBoxArray.valueChanges;
    this.initializeFormArrayControls();
    this.checkedItems$.subscribe(data => console.log(data));
  }

  checkCheckbox(e, optionName, index) {
    if (e.target.checked) {
      this.initializeFormArrayControls();
      this.populateFormArrayControls(index, optionName);
    } else {
      this.populateFormArrayControls(index, false);
      const arrayIsEmpty = this.checkBoxArray.value.every(
        element => element === false
      );
      if (arrayIsEmpty) {
        this.checkBoxArray.clear();
      }
    }
  }

  initializeFormArray(formArrayName): FormArray {
    return this.group.get(formArrayName) as FormArray;
  }

  initializeFormArrayControls() {
    if (this.checkBoxArray.value.length === 0) {
      this.config.options.forEach(() => {
        this.checkBoxArray.push(this.fb.control(false));
      });
    }
  }

  populateFormArrayControls(index, optionName) {
    this.checkBoxArray.removeAt(index);
    this.checkBoxArray.insert(index, this.fb.control(optionName));
  }
}
