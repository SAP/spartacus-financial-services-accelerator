import { Component } from '@angular/core';
import { AbstractOptionsComponent } from '../abstract-options/abstract-options.component';

@Component({
  selector: 'cx-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent extends AbstractOptionsComponent {
  ngOnInit() {
    super.ngOnInit();
    // console.log(
    //   this.group.controls[this.config.name].valueChanges.subscribe(data => data)
    // );
    // if (this.config.options) {
    //   const selectedOption = this.config.options.find(
    //     option => option.selected
    //   );
    //   if (selectedOption) {
    //     this.group.get(this.config.name).setValue(selectedOption.name);
    //   }
    // }
  }
  checkCheckbox(control, optionName) {
    if (control.value === true) {
      const selectedOption = this.config.options.filter(option => {
        return option.name === optionName;
      });
      // console.log(selectedOption[0].name);
      console.log(this.group.get(this.config.name).value);
    }
  }
}
