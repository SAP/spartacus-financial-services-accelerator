import { Component } from '@angular/core';
import { AbstractOptionsComponent } from '../abstract-options/abstract-options.component';

@Component({
  selector: 'cx-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent extends AbstractOptionsComponent {
  selectedControlName: string;
  selectedOptions: string;

  checkCheckbox(optionName) {
    const selectedOption = this.config.options.filter(
      option => option.name === optionName
    );
    if (
      this.group.controls[this.config.name].value === true &&
      this.selectedOptions !== selectedOption[0].name
    ) {
      this.selectedOptions = selectedOption[0].name;
      if (this.group.get(this.selectedOptions)) {
        this.group.get(this.selectedOptions).setValue(false);
      } else {
        this.group.addControl(
          this.selectedOptions,
          this.fb.control(this.selectedOptions, this.fb.control(''))
        );
        this.group.get(this.selectedOptions).setValue(true);
      }
    } else {
      if (this.group.get(this.selectedOptions)) {
        this.group.get(this.selectedOptions).setValue(false);
      }
    }
    console.log(this.group.value);
  }
}
