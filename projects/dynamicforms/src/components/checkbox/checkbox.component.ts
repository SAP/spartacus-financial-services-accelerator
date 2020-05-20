import { Component } from '@angular/core';
import { AbstractOptionsComponent } from '../abstract-options/abstract-options.component';

@Component({
  selector: 'cx-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent extends AbstractOptionsComponent {
  selectedControlName: string;
  selectedOptions: string[] = [];

  checkCheckbox(optionName) {
    let selectedControlName;
    const selectedOption = this.config.options.filter(
      option => option.name === optionName
    );
    if (!this.selectedOptions.includes(selectedOption[0].name)) {
      this.selectedOptions.push(selectedOption[0].name);
      selectedControlName = `added_${this.config.name}`;
      if (this.group.get(selectedControlName)) {
        this.group.get(selectedControlName).patchValue(this.selectedOptions);
      } else {
        this.group.addControl(
          selectedControlName,
          this.fb.control(this.selectedOptions)
        );
      }
    } else {
      this.selectedOptions = this.selectedOptions.filter(
        ctrl => ctrl !== selectedOption[0].name
      );
      this.group
        .get(`added_${this.config.name}`)
        .patchValue(this.selectedOptions);
    }
    console.log(this.group.value);
  }
}
