import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Injector,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { LanguageService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { OccValueListService } from '../../occ/services/occ-value-list.service';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { FormService } from './../../core/services/form/form.service';

@Component({
  selector: 'cx-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent extends AbstractFormComponent implements OnInit {
  fileList: string[] = [];
  fileSize: number[] = [];
  control$: Observable<any>;

  @HostListener('change', ['$event.target.files', '$event.target.accept'])
  handleFiles(files: FileList, fileType: string) {
    this.fileList = []; // reset when user is choosing files again
    this.fileSize = []; // reset when user is choosing files again
    const fileList = Array.from(files);
    if (this.config.accept === fileType.toString()) {
      fileList.map(data => {
        this.fileList = [...this.fileList, data.name];
        this.fileSize = [...this.fileSize, data.size];
      });
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

  ngOnInit() {
    super.ngOnInit();
    this.control$ = this.group.get(this.config.name).valueChanges;
    this.control$.subscribe(data => {
      this.fileList = [...data];
    });
  }
}
