import { Component, HostListener } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { AbstractFormComponent } from '../abstract-form/abstract-form.component';

@Component({
  selector: 'cx-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent extends AbstractFormComponent {
  fileList: File[] = [];
  uploadControl: AbstractControl;

  @HostListener('change', ['$event'])
  handleFiles(event) {
    this.fileList = [];
    this.uploadControl = this.group.get(this.config.name);
    if (
      this.config.accept.toString() === event.target.accept &&
      this.config.multiple === event.target.multiple &&
      this.checkFileSize(event)
    ) {
      this.fileList = Array.from(event.target.files);
      this.uploadControl.setValue(this.fileList);
    } else {
      this.uploadControl.markAsTouched({ onlySelf: true });
      this.uploadControl.setValue(null);
    }
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

  removeFile(i) {
    this.fileList.splice(i, 1);
    this.uploadControl.setValue(this.fileList);
    this.uploadControl.markAsTouched({ onlySelf: true });
  }
}
