import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { LocalizedString } from '../../core/models/form-config.interface';


@Component({
  selector: 'cx-abstract-options',
})
export class AbstractOptionsComponent extends AbstractFormComponent {

  ngOnInit() {
    super.ngOnInit();
  }

  getLocalizedOption( localizedString: LocalizedString, activelanguage: string) {
   return localizedString[activelanguage] 
        ? localizedString[activelanguage]
        : localizedString.default
  }
}
