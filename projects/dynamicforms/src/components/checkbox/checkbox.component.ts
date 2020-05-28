import { Component } from '@angular/core';
import { AbstractOptionsComponent } from '../abstract-options/abstract-options.component';
import { FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'cx-checkbox',
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent extends AbstractOptionsComponent {
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

  checkCheckbox(e, optionName, index) {
    if (this.checkBoxArray.value.includes('')) {
      this.checkBoxArray.clear();
    }
    if (e.target.checked) {
      this.checkBoxArray.insert(index, this.fb.control(optionName));
    } else {
      for (let i = 0; i < this.checkBoxArray.value.length; ) {
        this.checkBoxArray.controls.forEach(item => {
          if (item.value === optionName) {
            this.checkBoxArray.removeAt(i);
            return;
          }
          i++;
        });
      }
    }
  }

  addedControls(addedControl): FormArray {
    return this.group.get(addedControl) as FormArray;
  }
}
