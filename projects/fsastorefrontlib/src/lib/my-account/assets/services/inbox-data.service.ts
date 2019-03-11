import { Injectable } from '@angular/core';

export interface Message {
  messageCode: string;
}
export interface SearchConfig {
  page?: number;
  sortCode?: string;
  sortOrder?: string;
}
@Injectable()
export class InboxDataService {
  private _userId = 'anonymous';
  private _messageGroup: string;
  private _messages: Message[];
  private _searchConfig?: SearchConfig;

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
