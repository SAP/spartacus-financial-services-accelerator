import { Injectable } from '@angular/core';
import { SearchConfig, UserIdService } from '@spartacus/core';
import { filter } from 'rxjs/operators';
import { OCC_USER_ID_ANONYMOUS } from '@spartacus/core';

export interface InboxTab {
  messageGroup: string;
  title: string;
}

export interface FSSearchConfig extends SearchConfig {
  sortCode?: string;
  sortOrder?: string;
}

export interface InboxMessage {
  uid: string;
  subject?: string;
  body?: string;
  richContent?: string;
  sentDate?: string;
  documents?: any;
  read?: boolean;
  checked?: boolean;
  opened?: boolean;
  readDate?: string;
}

@Injectable({
  providedIn: 'root',
})
export class InboxDataService {
  private _userId = OCC_USER_ID_ANONYMOUS;

  constructor(protected userIdService: UserIdService) {
    this.userIdService
      .getUserId()
      .pipe(filter(userId => this.userId !== userId))
      .subscribe(userId => {
        if (Object.keys(userId).length !== 0) {
          this.userId = userId;
        } else {
          this.userId = OCC_USER_ID_ANONYMOUS;
        }
      });
  }

  set userId(val) {
    this._userId = val;
  }

  get userId(): string {
    return this._userId;
  }
}
