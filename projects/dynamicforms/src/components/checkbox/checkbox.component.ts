import { Component } from '@angular/core';
import { AbstractOptionsComponent } from '../abstract-options/abstract-options.component';

@Component({
  selector: 'cx-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent extends AbstractOptionsComponent {
  ngOnInit() {
    super.ngOnInit();
    // this.formDataService.selectedCheckboxName.push(this.config.name);
  }
  checkCheckbox(control, optionName) {
    const selectedOption = this.config.options.filter(
      option => option.name === optionName
    );
    if (
      control.value === true &&
      !this.formDataService.selectedOptions.includes(selectedOption[0].name)
    ) {
      if (
        !this.formDataService.selectedControlName.includes(this.config.name)
      ) {
        this.formDataService.selectedControlName.push(this.config.name);
      }
      this.formDataService.selectedOptions.push(selectedOption[0].name);
    } else {
      this.formDataService.selectedOptions = this.formDataService.selectedOptions.filter(
        ctrl => ctrl !== selectedOption[0].name
      );
    }
    this.formDataService.selectedCheckBoxControlsSource.next(
      this.formDataService.selectedControlName
    );
    this.formDataService.selectedCheckBoxesSource.next(
      this.formDataService.selectedOptions
    );
  }
}
