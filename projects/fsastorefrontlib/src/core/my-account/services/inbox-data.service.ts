import { Injectable } from '@angular/core';
import { SearchConfig } from '@spartacus/core';

export interface InboxTab {
  messageGroup: string;
  title: string;
}

export interface FSSearchConfig extends SearchConfig {
  sortCode?: string;
  sortOrder?: string;
}

export interface Message {
  uid: string;
  subject?: string;
  body?: string;
  richContent?: string;
  sentDate?: string;
  documents?: any;
  read?: boolean;
  checked?: boolean;
  opened?: boolean;
}

@Injectable()
export class InboxDataService {
  private _userId;
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
}
