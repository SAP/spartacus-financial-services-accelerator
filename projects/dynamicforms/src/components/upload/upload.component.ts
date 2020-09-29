import {
  Component,
  EventEmitter,
  HostListener,
  Injector,
  OnInit,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { LanguageService } from '@spartacus/core';
import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions,
} from 'ngx-uploader';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { FormService } from '../../core/services/form/form.service';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';

@Component({
  selector: 'cx-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent extends AbstractFormComponent implements OnInit {
  options: UploaderOptions;
  formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

  // fileList: File[] = [];
  uploadControl: AbstractControl;

  constructor(
    protected appConfig: DynamicFormsConfig,
    protected languageService: LanguageService,
    protected injector: Injector,
    protected formService: FormService
  ) {
    super(appConfig, languageService, injector, formService);
  }

  // @HostListener('change', ['$event'])
  // handleFiles(event) {
  //   this.uploadControl = this.group.get(this.config.name);
  //   if (
  //     this.config.accept.toString() === event.target.accept &&
  //     this.config.multiple === event.target.multiple &&
  //     this.checkFileSize(event)
  //   ) {
  //     this.fileList = Array.from(event.target.files);
  //     this.uploadControl.setValue(this.fileList);
  //   } else {
  //     this.uploadControl.markAsTouched({ onlySelf: true });
  //     this.uploadControl.setValue(null);
  //   }
  // }
  ngOnInit() {
    super.ngOnInit();
    this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;
    this.options = {
      concurrency: 1,
      maxUploads: this.config?.maxUploads,
      maxFileSize: this.config?.maxFileSize,
      allowedContentTypes: this.config?.accept,
    };
  }

  convertFileSize(bytes: number) {
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Number(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) {
      return `${bytes} ${sizes[i]}`;
    }
    return `${(bytes / 1024 ** i).toFixed(1)} ${sizes[i]}`;
  }

  checkFileSize(event): Boolean {
    const files: File[] = Array.from(event.target.files);
    const maxExceeded = files.filter(
      file => file.size / 1024 / 1024 > this.config.maxFileSize
    );
    return !(maxExceeded.length > 0);
  }

  // removeFile(i) {
  //   this.fileList.splice(i, 1);
  //   this.uploadControl.setValue(this.fileList);
  //   this.uploadControl.markAsTouched({ onlySelf: true });
  // }

  onUploadOutput(output: UploadOutput): void {
    this.uploadControl = this.group.get(this.config.name);
    switch (output.type) {
      case 'addedToQueue':
        if (typeof output.file !== 'undefined') {
          this.files.push(output.file);
          this.uploadControl.setValue(this.files);
        }
        break;
      case 'uploading':
        if (typeof output.file !== 'undefined') {
          // update current data in files array for uploading file
          const index = this.files.findIndex(
            file =>
              typeof output.file !== 'undefined' && file.id === output.file.id
          );
          this.files[index] = output.file;
        }
        break;
      case 'removed':
        // remove file from array when removed
        this.files = this.files.filter(
          (file: UploadFile) => file !== output.file
        );
        this.uploadControl.setValue(this.files);
        break;
      case 'dragOver':
        this.dragOver = true;
        break;
      case 'dragOut':
      case 'drop':
        this.dragOver = false;
        break;
      case 'done':
        // The file is downloaded
        break;
    }
  }

  startUpload(): void {
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://ngx-uploader.com/upload',
      method: 'POST',
      data: { foo: 'bar' },
    };

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }

  removeFile(id: string): void {
    this.uploadInput.emit({ type: 'remove', id: id });
  }

  removeAllFiles(): void {
    this.uploadInput.emit({ type: 'removeAll' });
  }
}
