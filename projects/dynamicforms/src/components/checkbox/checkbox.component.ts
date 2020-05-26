import { Component } from '@angular/core';
import { AbstractOptionsComponent } from '../abstract-options/abstract-options.component';
import { FormArray } from '@angular/forms';

@Component({
  selector: 'cx-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent extends AbstractOptionsComponent {
  selectedControlName: string;
  selectedOptions: string;
  checkBoxArray: FormArray;

  ngOnInit() {
    super.ngOnInit();
    this.checkBoxArray = this.addedControls(this.config.name);
    this.config.options.forEach(() => {
      this.addedControls(this.config.name).push(this.fb.control(''));
    });
  }

  checkCheckbox(event, optionName, index) {
    if (this.checkBoxArray.value.includes('')) {
      this.checkBoxArray.controls = []; // needed to clear the initial empty string values from fromArray
    }
    // if checkbox is checked and array doesn't contain checked value, insert it into array
    if (
      event.target.checked &&
      !this.checkBoxArray.value.includes(optionName)
    ) {
      this.checkBoxArray.insert(index, this.fb.control(optionName));
      // if checkbox is unchecked and array contains value that has been unchecked, remove it from array
    } else {
      this.checkBoxArray.removeAt(index);
    }
  }
  addedControls(addedControl): FormArray {
    return this.group.get(addedControl) as FormArray;
  }
}
