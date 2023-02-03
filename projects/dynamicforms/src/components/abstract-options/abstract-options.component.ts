import { Component, OnInit } from '@angular/core';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { LocalizedString } from '../../core/models/form-config.interface';

@Component({ template: '' })
export class AbstractOptionsComponent
  extends AbstractFormComponent
  implements OnInit
{
  ngOnInit() {
    super.ngOnInit();
    if (this.config.options) {
      const selectedOption = this.config.options.find(
        option => option.selected
      );
      if (selectedOption) {
        this.group.get(this.config.name).setValue(selectedOption.name);
      }
    }
  }
  getLocalizedOption(localizationObj: LocalizedString, activelanguage: string) {
    return localizationObj[activelanguage]
      ? localizationObj[activelanguage]
      : localizationObj.default;
  }
}
