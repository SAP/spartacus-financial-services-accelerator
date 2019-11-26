import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { AuthActions } from '@spartacus/core';

@Injectable()
export class FormStorageEffect {
  constructor(private actions$: Actions) {
    this.actions$.pipe(ofType(AuthActions.LOGOUT)).subscribe(() => {
      localStorage.setItem('dynamicFormsData', '[]');
    });
  }
}
