import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserIdService } from '@spartacus/core';
import { OboCustomerService } from '../../../core/services/obo-customer/obo-customer.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { YFormData, YFormDefinition } from '../../models';
import * as fromAction from '../../store/actions';
import * as fromSelector from '../../store/selectors';
import { StateWithForm } from '../../store/state';

@Injectable()
export class FormDataService {
  submittedForm = new BehaviorSubject<YFormData>(null);
  continueToNextStepSource = new BehaviorSubject<boolean>(false);
  continueToNextStep$ = this.continueToNextStepSource.asObservable();

  constructor(
    protected store: Store<StateWithForm>,
    protected userIdService: UserIdService,
    protected oboCustomerService: OboCustomerService
  ) {}

  setContinueToNextStep(isContinueClicked: boolean) {
    this.continueToNextStepSource.next(isContinueClicked);
  }

  submit(form: YFormData) {
    this.submittedForm.next(form);
  }

  getSubmittedForm(): Observable<YFormData> {
    return this.submittedForm.asObservable();
  }

  saveFormData(formData: YFormData) {
    this.oboCustomerService
      .getOboCustomerUserId()
      .pipe(
        map(userId => {
          this.store.dispatch(
            new fromAction.SaveFormData({ formData, userId })
          );
        })
      )
      .subscribe()
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
    this.oboCustomerService
      .getOboCustomerUserId()
      .pipe(
        map(userId => {
          this.store.dispatch(
            new fromAction.LoadFormData({ formDataId, userId })
          );
        })
      )
      .subscribe()
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
