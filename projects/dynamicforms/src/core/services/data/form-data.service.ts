import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserIdService } from '@spartacus/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { YFormData, YFormDefinition } from '../../models';
import * as fromAction from '../../store/actions';
import * as fromSelector from '../../store/selectors';
import { StateWithForm } from '../../store/state';

@Injectable()
export class FormDataService {
  submittedForm = new BehaviorSubject<YFormData>(null);
  formGroupSource = new Subject();
  formGroup = this.formGroupSource.asObservable();
  continueToNextStepSource = new BehaviorSubject<boolean>(false);
  continueToNextStep = this.continueToNextStepSource.asObservable();

  constructor(
    protected store: Store<StateWithForm>,
    protected userIdService: UserIdService
  ) {}

  setFormGroup(form: FormGroup) {
    this.formGroupSource.next(form);
  }

  setContinueToNextStep(isContinueClicked: boolean) {
    this.continueToNextStepSource.next(isContinueClicked);
  }

  submit(form: YFormData) {
    this.submittedForm.next(form);
  }

  getSubmittedForm(): Observable<YFormData> {
    return this.submittedForm.asObservable();
  }

  /**
   * @deprecated since 2.0
   * Duplicated submit method
   */
  setSubmittedForm(formData?: YFormData) {
    this.submittedForm.next(formData);
  }

  saveFormData(formData: YFormData) {
    this.userIdService
      .getUserId()
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
    this.userIdService
      .getUserId()
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
