import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { LocalizedString } from '../../core/models/form-config.interface';

@Component({ template: '' })
export class AbstractOptionsComponent extends AbstractFormComponent {
  ngOnInit() {
    super.ngOnInit();
  }

  getLocalizedOption(localizationObj: LocalizedString, activelanguage: string) {
    return localizationObj[activelanguage]
      ? localizationObj[activelanguage]
      : localizationObj.default;
  }
}
