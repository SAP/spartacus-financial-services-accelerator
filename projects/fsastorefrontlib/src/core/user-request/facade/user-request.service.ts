import { Injectable } from '@angular/core';
import { FormDataStorageService } from '@fsa/dynamicforms';
import { ActionsSubject, Store } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FSUserRequest } from '../../../occ/occ-models';
import { FSUserRequestState } from '../store/user-request-state';

@Injectable()
export class UserRequestService {
  constructor(
    protected actions$: ActionsSubject,
    protected store: Store<FSUserRequestState>,
    protected authService: AuthService,
    protected formDataStorageService: FormDataStorageService
  ) {}

  getAction(actionName): Observable<any> {
    return this.actions$.pipe(filter(action => action.type === actionName));
  }

  loadUserRequestFormData(userRequest: FSUserRequest) {
    userRequest.configurationSteps.forEach(stepData => {
      if (stepData.yformConfigurator) {
        this.formDataStorageService.setFormDataToLocalStorage(
          stepData.yformConfigurator
        );
      }
    });
  }
}
