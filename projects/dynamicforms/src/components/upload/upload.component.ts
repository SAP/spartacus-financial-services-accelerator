import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Injector,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { FileService } from '../../core/services/file/file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { LanguageService, AuthService } from '@spartacus/core';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { FormService } from './../../core/services/form/form.service';
import { take, map } from 'rxjs/operators';
import { saveAs } from 'file-saver';

@Component({
  selector: 'cx-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent extends AbstractFormComponent implements OnInit {
  fileList: File[] = [];
  uploadControl: AbstractControl;
  individualProgress = {};
  files = {};
  uploadDisable = false;
  removeAllDisable = false;

  constructor(
    protected appConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected injector: Injector,
    protected formService: FormService,
    protected fileUploadService: FileService,
    protected cd: ChangeDetectorRef,
    protected authService: AuthService
  ) {
    super(appConfig, languageService, injector, formService);
  }
  @HostListener('change', ['$event'])
  handleFiles(event) {
    // Reset when user is choosing files again
    this.resetFileList();
    this.individualProgress = {};
    this.uploadDisable = false;
    if (
      this.config.accept.toString() === event.target.accept &&
      this.config.multiple === event.target.multiple &&
      this.checkFileSize(event)
    ) {
      this.fileList = Array.from(event.target.files);
      this.fileList.splice(this.config.maxUploads);
      this.setValueAndValidate(this.fileList);
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

  convertFileSize(bytes: number) {
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) {
      return `${bytes} ${sizes[i]}`;
    }
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }

  uploadFiles(files: File[]) {
    this.uploadDisable = true;
    this.removeAllDisable = true;
    this.setValueAndValidate(this.fileList);
    files.forEach((file, index) => {
      this.subscription.add(
        this.fileUploadService.uploadFile(file).subscribe(event => {
          if (event?.type === HttpEventType.UploadProgress) {
            this.individualProgress[index] = Math.round(
              (100 * event.loaded) / event.total
            );
            this.cd.detectChanges();
          }
          if (event instanceof HttpResponse) {
            this.setFileCode(file, event);
            this.handleFileResponse(event);
          }
          // when all files are finished uploading show the remove all button
          this.removeAllDisable = !!this.overallProgressFinished(
            this.individualProgress
          );
        })
      );
    });
  }

  private overallProgressFinished(progress) {
    return (
      Object.keys(progress).filter((_k, i) => progress[i] !== 100).length !== 0
    );
  }

  checkFileSize(event): Boolean {
    const files: File[] = Array.from(event.target.files);
    const maxExceeded = files.filter(
      file => file.size > this.config.maxFileSize
    );
    return !(maxExceeded.length > 0);
  }

  removeFile(index, uploadField) {
    // Execute Http.Delete request to backend
    this.subscription.add(
      this.authService
        .getOccUserId()
        .pipe(
          take(1),
          map(occUserId => {
            const fileCode = (<any>this.fileList[index])?.code;
            if (fileCode) {
              this.fileUploadService.removeFileForCode(occUserId, fileCode);
            }
          })
        )
        .subscribe()
    );
    this.fileList.splice(index, 1);
    this.setValueAndValidate(this.fileList);

    // reset DOM File element to sync it with reactive control
    if (this.fileList.length === 0) {
      uploadField.value = null;
    }
  }

  removeAll(uploadField) {
    this.subscription.add(
      this.authService
        .getOccUserId()
        .pipe(
          take(1),
          map(occUserId => {
            this.fileUploadService.removeAllFiles(occUserId, this.fileList);
          })
        )
        .subscribe()
    );
    this.fileList = [];
    uploadField.value = null;
    this.setValueAndValidate(this.fileList);
  }

  downloadFile(file) {
    this.subscription.add(
      this.fileUploadService
        .getFile(file.code, file.type)
        .pipe(
          map(downloadedFile => {
            saveAs(downloadedFile, file.name);
          })
        )
        .subscribe()
    );
  }

  protected setValueAndValidate(value: File[]) {
    this.uploadControl.setValue(value);
    this.uploadControl.markAsTouched({ onlySelf: true });
  }

  protected handleFileResponse(event) {
    this.fileUploadService.setFileInStore(event.body);
    const fileCode = event.body.code;
    this.files[this.config.name].push(fileCode);
    this.uploadControl.setValue(this.files);
  }

  protected resetFileList() {
    this.fileList = [];
    this.files = {
      [this.config.name]: [],
    };
    this.fileUploadService.resetFiles();
  }

  protected setFileCode(file, event) {
    if (event.body?.code) {
      file.code = event.body?.code;
    }
    this.cd.detectChanges();
  }
}
