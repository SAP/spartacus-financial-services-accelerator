import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Injector,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FileUploadService } from '../../core/services/file/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { LanguageService } from '@spartacus/core';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { FormService } from './../../core/services/form/form.service';

@Component({
  selector: 'cx-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent extends AbstractFormComponent implements OnInit {
  fileList: File[] = [];
  uploadControl: AbstractControl;
  progress: number;

  constructor(
    protected appConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected injector: Injector,
    protected formService: FormService,
    protected fileUploadService: FileUploadService,
    protected cd: ChangeDetectorRef
  ) {
    super(appConfig, languageService, injector, formService);
  }
  @HostListener('change', ['$event'])
  handleFiles(event) {
    // Reset when user is choosing files again!
    this.fileList = [];
    if (
      this.config.accept.toString() === event.target.accept &&
      this.config.multiple === event.target.multiple &&
      this.checkFileSize(event)
    ) {
      this.fileList = Array.from(event.target.files);
      this.fileList.splice(this.config.maxUploads);
      this.uploadControl.setValue(this.fileList);
    } else {
      // triggering reset and validation if something was manipulated through DOM inspector
      // or files are violating config rules
      this.setValueAndValidate(null);
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.uploadControl = this.group.get(this.config.name);
  }

  protected setValueAndValidate(value: File[]) {
    this.uploadControl.setValue(value);
    this.uploadControl.markAsTouched({ onlySelf: true });
  }

  convertFileSize(bytes: number) {
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) {
      return `${bytes} ${sizes[i]}`;
    }
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }

  uploadFiles(files: File[]) {
    files.forEach(file => {
      this.fileUploadService.uploadFile(file).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round((100 * event.loaded) / event.total);
          this.cd.detectChanges();
        }
        if (event instanceof HttpResponse) {
          this.progress = 0;
        }
      });
    });
  }

  checkFileSize(event): Boolean {
    const files: File[] = Array.from(event.target.files);
    const maxExceeded = files.filter(
      file => file.size > this.config.maxFileSize
    );
    return !(maxExceeded.length > 0);
  }

  removeFile(index, uploadField) {
    this.fileList.splice(index, 1);
    this.setValueAndValidate(this.fileList);
    // reset DOM File element to sync it with reactive control
    if (this.fileList.length === 0) {
      uploadField.value = null;
    }
  }

  removeAll(uploadField) {
    this.fileList = [];
    uploadField.value = null;
    this.setValueAndValidate(this.fileList);
  }
}
