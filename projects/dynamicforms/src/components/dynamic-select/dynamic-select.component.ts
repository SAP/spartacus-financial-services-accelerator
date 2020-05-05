import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-dynamic-select',
  templateUrl: './dynamic-select.component.html',
})
export class DynamicSelectComponent extends AbstractFormComponent
  implements OnInit, OnDestroy {
  optionsSubject = new BehaviorSubject<any>([]);
  options$: Observable<any> = this.optionsSubject.asObservable();

  ngOnInit() {
    super.ngOnInit();
    this.setFormControlValuesFromAPI();
  }

  setFormControlValuesFromAPI() {
    if (this.config.apiUrl) {
      const options = [];
      this.subscription.add(
        this.formService
          .getValuesFromAPI(this.config.apiUrl)
          .pipe(
            map(result => {
              if (result.values) {
                result.values.forEach(item => {
                  options.push({
                    name: item.key,
                    label: item.value,
                  });
                });
                this.optionsSubject.next(options);
                this.group.get(this.config.name).setValue(null);
              }
            })
          )
          .subscribe()
      );
    }
  }
}
