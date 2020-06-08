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
  checkedItems$: Observable<any>;
  selectedItems: [];

  ngOnInit() {
    super.ngOnInit();
    this.checkBoxArray = this.addedControls(this.config.name);
    this.checkedItems$ = this.checkBoxArray.valueChanges;

    if (this.checkBoxArray.value.length === 0) {
      this.config.options.forEach(() => {
        this.checkBoxArray.push(this.fb.control(''));
      });
    }
    this.selectedItems = this.checkBoxArray.value;
    console.log(this.selectedItems);
    this.checkedItems$.subscribe(data => console.log(data));
  }

  checkCheckbox(e, optionName, index) {
    if (e.target.checked) {
      if (this.checkBoxArray.value.includes('')) {
        this.checkBoxArray.clear();
      }
      this.checkBoxArray.insert(index, this.fb.control(optionName));
    } else {
      for (let i = 0; i < this.checkBoxArray.value.length; ) {
        this.checkBoxArray.controls.forEach(item => {
          if (item.value === optionName) {
            this.checkBoxArray.removeAt(i);
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
