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

  checkCheckbox(optionName) {
    let selectedControlName;
    const selectedOption = this.config.options.filter(
      option => option.name === optionName
    );
    if (
      this.group.controls[this.config.name].value === true &&
      this.selectedOptions !== selectedOption[0].name
    ) {
      this.selectedOptions = selectedOption[0].name;
      selectedControlName = `added_${this.config.name}`;
      if (this.group.get(selectedControlName)) {
        this.addedControls(selectedControlName).push(
          this.fb.control(this.selectedOptions)
        );
      } else {
        this.group.addControl(
          selectedControlName,
          this.fb.array([this.selectedOptions])
        );
      }
    } else {
      if (this.group.get(`added_${this.config.name}`)) {
        this.addedControls(`added_${this.config.name}`).removeAt(
          this.group
            .get(`added_${this.config.name}`)
            .value.findIndex(elem => elem === this.selectedOptions)
        );
        this.selectedOptions = null;
      }
    }
    console.log(this.group.value);
  }
  addedControls(addedControl): FormArray {
    return this.group.get(addedControl) as FormArray;
  }
}
