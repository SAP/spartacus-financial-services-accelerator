import { Component, OnInit, OnDestroy } from '@angular/core';
import { AbstractFormComponent } from '../abstract-form.component';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-select',
  templateUrl: './select.component.html',
})
export class SelectComponent extends AbstractFormComponent
  implements OnInit, OnDestroy {
  private sub = new Subscription();

  optionsSubject = new BehaviorSubject<any>([]);
  options: Observable<any>;

  ngOnInit() {
    if (this.config.apiUrl) {
      this.setFormControlValuesFromAPI();
    }
  }

  setFormControlValuesFromAPI() {
    this.config.options = [];
    this.sub.add(
      this.formService
        .getValuesFromAPI(this.config.apiUrl)
        .pipe(
          map(result => {
            if (result.values) {
              result.values.forEach(item => {
                this.config.options.push({
                  name: item.key,
                  label: item.value,
                });
              });
              this.optionsSubject.next(this.config.options);
            }
          })
        )
        .subscribe()
    );
  }

  getOptions(): Observable<any> {
    return this.optionsSubject.asObservable();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
