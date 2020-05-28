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

  ngOnInit() {
    super.ngOnInit();
    this.checkBoxArray = this.addedControls(this.config.name);
    this.checkedItems$ = this.checkBoxArray.valueChanges; // this always gives us the state of formArray, might be used in HTML?

    // this checks if the formArray is comming from formBuilder (it's only instantiated there)
    // and then fills it with formControls of default value - empty string
    // If we were to fill the controls with config.options.name, they would be all preselected when the form is loaded for the first time
    if (this.checkBoxArray.value.length === 0) {
      this.config.options.forEach(() => {
        this.checkBoxArray.push(this.fb.control(''));
      });
    }
    this.checkedItems$.subscribe(data => console.log(data));
  }

  checkCheckbox(e, optionName, index) {
    // when checkbox is clicked the default empty strings are cleared and the formArray is populated with the clicked values
    // this has to be done because if 1 checkbox is checked and then unchecked,
    // if array hasn't been cleared the validation won't fire, because array would still hold something like this [true, "", "", ""]
    if (e.target.checked) {
      if (this.checkBoxArray.value.includes('')) {
        this.checkBoxArray.clear();
      }
      this.checkBoxArray.insert(index, this.fb.control(optionName));
    } else {
      // cannot use index from HTML template, because it doesn't return the items in their previous index place
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
