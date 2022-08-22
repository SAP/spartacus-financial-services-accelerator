import { HttpEventType, HttpResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  HostListener,
  Injector,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import {
  GlobalMessageService,
  GlobalMessageType,
  LanguageService,
  UserIdService,
} from '@spartacus/core';
import { saveAs } from 'file-saver';
import { map, take } from 'rxjs/operators';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FileService } from '../../core/services/file/file.service';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';
import { FormService } from './../../core/services/form/form.service';
import { FormDataService } from '../../core/services/data/form-data.service';
import { FieldConfig } from '../../core';
import { DocumentFile } from '../../core/models/form-occ.models';

@Component({
  selector: 'cx-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent extends AbstractFormComponent implements OnInit {
  fileList: DocumentFile[] = [];
  uploadControl: AbstractControl;
  individualProgress = {};
  files = [];
  uploadDisable = false;
  removeAllDisable = false;

  constructor(
    protected appConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected injector: Injector,
    protected formService: FormService,
    protected formDataService: FormDataService,
    protected fileUploadService: FileService,
    protected cd: ChangeDetectorRef,
    protected userIdService: UserIdService,
    protected globalMessageService: GlobalMessageService
  ) {
    super(appConfig, languageService, injector, formService);
  }

  @HostListener('change', ['$event'])
  handleFiles(event) {
    // Reset when user is choosing files again
    this.removeAllFromStorage();
    this.resetFileList();
    this.individualProgress = {};
    this.uploadDisable = false;
    const filteredFiles = this.filterFiles(this.config, event.target.files);
    if (
      this.config.accept.toString() === event.target.accept &&
      this.config.multiple === event.target.multiple
    ) {
      this.fileList = Array.from(filteredFiles);
      this.fileList.splice(this.config.maxUploads);
      if (this.fileList.length === 0) {
        this.setValueAndValidate(null);
      }
    } else {
      // triggering reset and validation if something was manipulated through DOM inspector
      // or files are violating config rules
      this.setValueAndValidate(null);
    }
  }

  ngOnInit() {
    super.ngOnInit();
    this.uploadControl = this.group.get(this.config.name);
    this.populateUploadedFiles();
  }

  protected populateUploadedFiles() {
    this.subscription.add(
      this.fileUploadService
        .getUploadedDocuments()
        .pipe(
          map(filesObj => {
            if (Object.keys(filesObj?.files).length > 0) {
              this.fileList = Array.from(Object.values(filesObj?.files));
              this.fileList.forEach((file: DocumentFile) => {
                if (!this.files.includes(file.code)) {
                  this.files.push(file.code);
                }
              });
              this.uploadControl?.setValue(this.files);
              this.uploadDisable = true;
              this.cd.detectChanges();
            } else {
              this.uploadControl?.setValue(null);
            }
          })
        )
        .subscribe()
    );
  }

  protected filterFiles(config: FieldConfig, files: FileList) {
    const filtedFiles = [];
    Array.from(files).forEach(file => {
      if (
        config.accept.includes(file.type) &&
        file.size <= this.config.maxFileSize
      ) {
        filtedFiles.push(file);
      }
    });
    return filtedFiles;
  }

  convertFileSize(bytes: number) {
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) {
      return `${bytes} ${sizes[i]}`;
    }
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }

  uploadFiles(files: DocumentFile[]) {
    this.uploadDisable = true;
    this.removeAllDisable = true;
    this.setValueAndValidate(this.fileList);
    files.forEach((file, index) => {
      this.subscription.add(
        this.fileUploadService.uploadFile(file).subscribe(
          event => {
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
          },
          error => {
            this.globalMessageService.add(
              {
                key: 'dynamicforms.documentUploadError',
              },
              GlobalMessageType.MSG_TYPE_ERROR
            );
          }
        )
      );
    });
  }

  removeFile(index, uploadField) {
    // Execute Http.Delete request to backend
    this.subscription.add(
      this.userIdService
        .getUserId()
        .pipe(
          take(1),
          map(occUserId => {
            const fileCode = (<any>this.fileList[index])?.code;
            if (fileCode) {
              this.fileUploadService.removeFileForCode(occUserId, fileCode);
              this.setValueAndValidate(null);
            }
          })
        )
        .subscribe()
    );
    this.fileList.splice(index, 1);
    if (this.files.length !== 0) {
      this.files.splice(index, 1);
      this.setValueAndValidate(this.files);
    }

    // reset DOM File element to sync it with reactive control
    if (this.fileList.length === 0) {
      uploadField.value = null;
    }
  }

  removeAll(uploadField) {
    this.removeAllFromStorage();
    this.fileList = [];
    uploadField.value = null;
    this.setValueAndValidate(this.fileList);
  }

  downloadFile(file) {
    this.subscription.add(
      this.fileUploadService
        .getFile(file.code, file.type ? file.type : file.mime)
        .pipe(
          map(downloadedFile => {
            saveAs(downloadedFile, file.name);
          })
        )
        .subscribe()
    );
  }

  protected removeAllFromStorage() {
    this.subscription.add(
      this.userIdService
        .getUserId()
        .pipe(
          take(1),
          map(occUserId => {
            this.fileUploadService.removeAllFiles(occUserId, this.fileList);
            this.fileUploadService.resetFiles();
          })
        )
        .subscribe()
    );
  }

  protected overallProgressFinished(progress) {
    return (
      Object.keys(progress).filter((_k, i) => progress[i] !== 100).length !== 0
    );
  }

  protected setValueAndValidate(value: DocumentFile[]) {
    this.uploadControl.setValue(value);
    this.uploadControl.markAsTouched({ onlySelf: true });
  }

  protected handleFileResponse(event) {
    this.fileUploadService.setFileInStore(event.body);
    const fileCode = event.body.code;
    if (!this.files.includes(fileCode)) {
      this.files.push(fileCode);
    }
    this.uploadControl.setValue(this.files);
  }

  protected resetFileList() {
    this.fileList = [];
    this.files = [];
    this.fileUploadService.resetFiles();
  }

  protected setFileCode(file, event) {
    if (event.body?.code) {
      file.code = event.body?.code;
    }
    this.cd.detectChanges();
  }
}
