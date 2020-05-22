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

  // ngOnInit() {
  //   super.ngOnInit();
  //   console.log(this.group.value);
  // }

  checkCheckbox(event, optionName) {
    const checkBoxArray = this.addedControls(this.config.name);
    if (event.target.checked && !checkBoxArray.value.includes(optionName)) {
      this.addedControls(this.config.name).push(this.fb.control(optionName));
    } else {
      this.addedControls(this.config.name).removeAt(
        this.group
          .get(this.config.name)
          .value.findIndex(elem => elem === this.selectedOptions)
      );
    }
    console.log(this.group.value);
  }
  addedControls(addedControl): FormArray {
    return this.group.get(addedControl) as FormArray;
  }
}
