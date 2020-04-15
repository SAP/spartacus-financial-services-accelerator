import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../abstract-form.component';
import { map } from 'rxjs/operators';
import { FieldOption } from 'dynamicforms/src/core';

@Component({
  selector: 'cx-select',
  templateUrl: './select.component.html',
})
export class SelectComponent extends AbstractFormComponent implements OnInit {
  ngOnInit() {
    if (this.config.depends) {
      this.config.depends.forEach(dependField => {
        this.group.get(dependField).valueChanges.subscribe(val => {
          this.setFormControlValues(val);
        });
      });
    }
    this.setFormControlValues(null);
  }

  setFormControlValues(val: string) {
    if (this.config.apiUrl) {
      this.config.options = [];
      this.getValuesFromAPI(this.config.apiUrl)
        .pipe(
          map(result => {
            if (result.values) {
              const apiValues: FieldOption[] = [];
              result.values.forEach(item => {
                apiValues.push({
                  name: item.key,
                  label: item.value,
                });
              });
              this.config.options = apiValues;
            }
          })
        )
        .subscribe();
    }
  }
}
