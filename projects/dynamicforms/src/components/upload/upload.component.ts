import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Injector,
} from '@angular/core';
import { LanguageService } from '@spartacus/core';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { OccValueListService } from '../../occ/services/occ-value-list.service';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { FormService } from './../../core/services/form/form.service';

@Component({
  selector: 'cx-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent extends AbstractFormComponent {
  fileList: File[] = [];

  @HostListener('change', ['$event'])
  handleFiles(event) {
    this.fileList = []; // reset when user is choosing files again
    if (
      this.config.accept === event.target.accept.toString() &&
      this.config.multiple === event.target.multiple
    ) {
      this.fileList = Array.from(event.target.files);
      this.group.get(this.config.name).setValue(this.fileList);
    } else {
      this.group.get(this.config.name).setValue(null); // triggering validation if nothing is selected
    }
  }

  constructor(
    protected occValueListService: OccValueListService,
    protected formConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected changeDetectorRef: ChangeDetectorRef,
    protected formService: FormService,
    protected injector: Injector
  ) {
    super(formConfig, languageService, injector, formService);
  }
}
