import { Component } from '@angular/core';
import { AbstractOptionsComponent } from '../abstract-options/abstract-options.component';

@Component({
  selector: 'cx-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent extends AbstractOptionsComponent {
  selectedControlName: string;
  selectedOptions: string[] = [];

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
      !this.selectedOptions.includes(selectedOption[0].name)
    ) {
      if (this.selectedControlName !== this.config.name) {
        this.selectedControlName = this.config.name;
      }
      this.selectedOptions.push(selectedOption[0].name);
      const selectedControlName = `added_${this.selectedControlName}`;
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
    }
    console.log(this.group.value);
    // console.log(this.selectedControlName, this.selectedOptions);
    // this.formDataService.selectedCheckBoxControlsSource.next(
    //   this.formDataService.selectedControlName
    // );
    // this.formDataService.selectedCheckBoxesSource.next(
    //   this.formDataService.selectedOptions
    // );
  }
}
