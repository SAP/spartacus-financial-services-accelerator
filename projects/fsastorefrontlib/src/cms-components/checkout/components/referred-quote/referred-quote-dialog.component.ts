import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { LaunchDialogService } from '@spartacus/storefront';

@Component({
  selector: 'cx-fs-referred-quote-dialog',
  templateUrl: './referred-quote-dialog.component.html',
})
export class ReferredQuoteDialogComponent {
  @Output()
  referredQuote$: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild('dialog', { static: false, read: ElementRef })
  dialog: ElementRef;

  constructor(protected launchDialogService: LaunchDialogService) {}

  dismissModal(reason?: any): void {
    this.launchDialogService.closeDialog(reason);
    this.referredQuote$.emit(false);
  }
}
