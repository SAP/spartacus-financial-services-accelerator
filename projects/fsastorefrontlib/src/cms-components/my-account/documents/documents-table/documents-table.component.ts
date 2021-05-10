import {
  Component,
  ChangeDetectionStrategy,
  Input,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { FileService } from '@spartacus/dynamicforms';

@Component({
  selector: 'cx-fs-documents-table',
  templateUrl: './documents-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsTableComponent implements OnDestroy {
  @Input()
  documentSource: any;
  @Input()
  referredObjectColumnVisible = true;
  subscription = new Subscription();

  constructor(protected fileService: FileService) {}

  downloadDocument(document) {
    this.subscription.add(this.fileService.getDocument(document).subscribe());
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
