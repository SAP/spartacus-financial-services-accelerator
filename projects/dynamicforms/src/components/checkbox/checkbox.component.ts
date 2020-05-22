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
    console.log(this.group.value);
  }

  checkCheckbox(event, optionName, i) {
    if (
      event.target.checked &&
      !this.checkBoxArray.value.includes(optionName)
    ) {
      if (this.checkBoxArray.value.includes('')) {
        this.addedControls(this.config.name).controls.splice(
          0,
          this.addedControls(this.config.name).controls.length
        );
      }
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
