import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StateWithSiteContext, LanguagesEntities } from '../store/state';
import {
  getAllLanguages,
  LoadLanguages,
  getActiveLanguage,
  SetActiveLanguage
} from '../store/index';
import { SiteContextConfig } from '../config/config';

@Injectable()
export class LanguageService {
  readonly languages$: Observable<LanguagesEntities> = this.store.pipe(
    select(getAllLanguages)
  );

  readonly activeLanguage$: Observable<string> = this.store.pipe(
    select(getActiveLanguage)
  );

  constructor(
    private store: Store<StateWithSiteContext>,
    private config: SiteContextConfig
  ) {
    this.initActiveLanguage();
    this.loadLanguages();
  }

  protected loadLanguages() {
    this.store.dispatch(new LoadLanguages());
  }

  public set activeLanguage(isocode: string) {
    this.store.dispatch(new SetActiveLanguage(isocode));
  }

  protected initActiveLanguage() {
    if (sessionStorage) {
      this.activeLanguage = !sessionStorage.getItem('language')
        ? this.config.site.language
        : sessionStorage.getItem('language');
    } else {
      this.activeLanguage = this.config.site.language;
    }
  }
}
