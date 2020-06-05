import { Injectable } from '@angular/core';
import { I18nextTranslationService } from '@spartacus/core';

@Injectable()
export class FSTranslationService extends I18nextTranslationService {
  protected readonly SEPARATOR = '.';

  /**
   * Translates given key
   *
   * @param translationChunks identifiers of defined translation constants
   * @param translationKey translation key
   */
  getTranslationValue(
    translationChunks: Array<string>,
    translationKey: string
  ) {
    let result;
    const translationCodes = translationChunks.join(this.SEPARATOR);
    this.translate(translationCodes + this.SEPARATOR + translationKey)
      .subscribe(translation => {
        if (!translation.includes(translationCodes)) {
          result = translation;
        }
      })
      .unsubscribe();
    return result;
  }
}
