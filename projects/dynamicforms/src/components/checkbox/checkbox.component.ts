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
    this.checkBoxArray = this.addedControls(this.config.name);
    this.checkedItems$ = this.checkBoxArray.valueChanges;
    this.initializeCheckboxes();
    this.checkedItems$.subscribe(data => console.log(data));
  }

  checkCheckbox(e, optionName, index) {
    if (e.target.checked) {
      this.initializeCheckboxes();
      this.populateCheckboxes(index, optionName);
    } else {
      this.populateCheckboxes(index, false);
      const isEmpty = this.checkBoxArray.value.every(
        element => element === false
      );
      if (isEmpty) {
        this.checkBoxArray.clear();
      }
    }
  }

  initializeCheckboxes() {
    if (this.checkBoxArray.value.length === 0) {
      this.config.options.forEach(() => {
        this.checkBoxArray.push(this.fb.control(false));
      });
    }
  }

  populateCheckboxes(index, optionName) {
    this.checkBoxArray.removeAt(index);
    this.checkBoxArray.insert(index, this.fb.control(optionName));
  }

  addedControls(addedControl): FormArray {
    return this.group.get(addedControl) as FormArray;
  }
}
