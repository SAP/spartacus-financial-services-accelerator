import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, tap } from 'rxjs/operators';

const MESSAGE_TYPE = {
  [GlobalMessageType.MSG_TYPE_INFO]: 'info',
  [GlobalMessageType.MSG_TYPE_ERROR]: 'danger',
  [GlobalMessageType.MSG_TYPE_WARNING]: 'warning',
  [GlobalMessageType.MSG_TYPE_CONFIRMATION]: 'success',
};

@Component({
  selector: 'cx-fs-message',
  templateUrl: './message.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fade', [
      transition('* => void', [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class FSMessageComponent implements OnChanges {
  @Input() messageText$: Observable<string>;
  @Input() timeout: number;
  @Input() set type(type: GlobalMessageType) {
    this.messageCssClass = MESSAGE_TYPE[type];
  }
  showMessage$ = new Subject();
  messageCssClass: string;
  constructor() {}

  ngOnChanges(): void {
    if (this.messageText$) {
      this.showMessage$.next(true);
      this.messageText$
        .pipe(
          debounceTime(this.timeout),
          tap(() => {
            this.showMessage$.next(false);
          }),
          takeUntil(this.showMessage$)
        )
        .subscribe();
    }
  }

  close() {
    this.showMessage$.next(false);
  }

  ngOnDestroy() {
    this.showMessage$.complete();
  }
}
