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
    if (this.checkBoxArray.value.length === 0) {
      this.config.options.forEach(() => {
        this.checkBoxArray.push(this.fb.control(''));
      });
    }
  }

  checkCheckbox(event, optionName, index) {
    if (this.checkBoxArray.value.includes('')) {
      this.checkBoxArray.controls = [];
    }
    if (
      event.target.checked &&
      !this.checkBoxArray.value.includes(optionName)
    ) {
      this.checkBoxArray.insert(index, this.fb.control(optionName));
    } else {
      this.checkBoxArray.removeAt(index);
    }
  }
  addedControls(addedControl): FormArray {
    return this.group.get(addedControl) as FormArray;
  }
}
