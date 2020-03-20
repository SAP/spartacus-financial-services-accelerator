import { Injectable } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActionsSubject, Store } from '@ngrx/store';
import * as fromReducer from '../store/reducers';
import { FSUserRequest } from '../../../occ/occ-models';
import { FormDataService } from '@fsa/dynamicforms';
import { AuthService } from '@spartacus/core';

@Injectable()
export class UserRequestService {
  constructor(
    protected actions$: ActionsSubject,
    protected store: Store<fromReducer.FSUserRequestState>,
    protected formDataService: FormDataService,
    protected authService: AuthService
  ) {}

  getAction(actionName): Observable<any> {
    return this.actions$.pipe(filter(action => action.type === actionName));
  }

  loadUserRequestFormData(userRequest: FSUserRequest) {
    userRequest.configurationSteps.forEach(stepData => {
      if (stepData.yformConfigurator) {
        this.formDataService.setFormDataToLocalStorage(
          stepData.yformConfigurator
        );
      }
    });
  }
}
