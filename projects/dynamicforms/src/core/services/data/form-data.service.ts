import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { YFormData, YFormDefinition } from '../../models';
import * as fromAction from '../../store/actions';
import * as fromSelector from '../../store/selectors';
import { StateWithForm } from '../../store/state';

@Injectable()
export class FormDataService {
  submittedForm = new BehaviorSubject<YFormData>(null);

  constructor(
    protected store: Store<StateWithForm>,
    protected authService: AuthService
  ) {}

  submit(form: YFormData) {
    this.submittedForm.next(form);
  }

  getSubmittedForm(): Observable<YFormData> {
    return this.submittedForm.asObservable();
  }

  setSubmittedForm(formData?: YFormData) {
    this.submittedForm.next(formData);
  }

  saveFormData(formData: YFormData) {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        this.store.dispatch(
          new fromAction.SaveFormData({
            formData: formData,
            userId: occUserId,
          })
        );
      })
      .unsubscribe();
  }

  loadFormDefinition(applicationId: string, formDefinitionId: string) {
    this.store.dispatch(
      new fromAction.LoadFormDefinition({
        applicationId: applicationId,
        formDefinitionId: formDefinitionId,
      })
    );
  }

  loadFormDefinitions(categoryCode: string, formDefinitionType: string) {
    this.store.dispatch(
      new fromAction.LoadFormDefinition({
        categoryCode: categoryCode,
        formDefinitionType: formDefinitionType,
      })
    );
  }

  loadFormData(formDataId: string) {
    this.authService
      .getOccUserId()
      .pipe(take(1))
      .subscribe(occUserId => {
        this.store.dispatch(
          new fromAction.LoadFormData({
            formDataId: formDataId,
            userId: occUserId,
          })
        );
      })
      .unsubscribe();
  }

  getFormData(): Observable<YFormData> {
    return this.store.select(fromSelector.getFormDataLoaded).pipe(
      filter(loaded => loaded),
      take(1),
      switchMap(_ => {
        return this.store.select(fromSelector.getFormData);
      })
    );
  }

  getFormDefinition(): Observable<YFormDefinition> {
    return this.store.select(fromSelector.getFormDefinitionLoaded).pipe(
      filter(loaded => loaded),
      take(1),
      switchMap(_ => {
        return this.store.select(fromSelector.getFormDefinition);
      })
    );
  }
}
