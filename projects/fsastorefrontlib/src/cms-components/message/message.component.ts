import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
} from '@angular/core';
import { GlobalMessageType } from '@spartacus/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

const MESSAGE_TYPES = {
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
      transition(':enter', [
        style({ opacity: 0 }),
        animate(100, style({ opacity: 1 })),
      ]),
      transition(':leave', [animate(300, style({ opacity: 0 }))]),
    ]),
  ],
})
export class FSMessageComponent implements OnChanges, OnDestroy {
  @Input() messageText: string;
  @Input() timeout: number;
  @Input() set type(type: GlobalMessageType) {
    this.messageCssClass = MESSAGE_TYPES[type];
  }
  showMessage$ = new Subject();
  messageText$ = new BehaviorSubject('');
  messageCssClass: string;
  subscription = new Subscription();

  ngOnChanges(): void {
    if (this.messageText) {
      this.messageText$.next(this.messageText);
      this.showMessage$.next(true);
      this.closeWithDelay();
    }
  }

  closeWithDelay() {
    this.subscription.add(
      this.messageText$
        .asObservable()
        .pipe(
          debounceTime(this.timeout),
          tap(() => this.showMessage$.next(false))
        )
        .subscribe()
    );
  }

  close() {
    this.showMessage$.next(false);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
