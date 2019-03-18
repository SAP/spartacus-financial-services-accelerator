import { Injectable } from '@angular/core';
import { SearchConfig } from '@spartacus/core';

export interface Message {
  messageCode?: string;
  readDate?: string;
  messageUid?: string;
}
export interface FSSearchConfig extends SearchConfig {
  sortCode?: string;
  sortOrder?: string;
}
export interface MessagesCollection {
  messagesUid?: Message[];
  read?: boolean;
}
@Injectable()
export class InboxDataService {
  private _userId = 'anonymous';
  private _messageGroup: string;
  private _messages: Message[];
  private _searchConfig?: SearchConfig;
  private _messagesCollection?: MessagesCollection;

  constructor() {}

  set userId(val) {
    this._userId = val;
  }

  get userId(): string {
    return this._userId;
  }

  set searchConfig(val) {
    this._searchConfig = val;
  }

  get searchConfig(): SearchConfig {
    return this._searchConfig;
  }

  set MessagesCollection(val) {
    this._messagesCollection = val;
  }

  get MessagesCollection(): MessagesCollection {
    return this._messagesCollection;
  }

  set messageGroup(val) {
    this._messageGroup = val;
  }

  get messageGroup(): string {
    return this._messageGroup;
  }

  set messages(val: Message[]) {
    this._messages = val;
  }

  get messages(): Message[] {
    return this._messages;
  }
}
