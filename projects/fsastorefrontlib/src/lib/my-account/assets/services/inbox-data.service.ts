import { Injectable } from '@angular/core';

export interface Message {
  messageCode: string;
}

@Injectable()
export class InboxDataService {
  private _userId = 'anonymous';
  private _messageGroup: string;
  private _messages: Message[];

  constructor() {}

  set userId(val) {
    this._userId = val;
  }

  get userId(): string {
    return this._userId;
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
