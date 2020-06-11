import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import { FormDataStorageService } from '@fsa/dynamicforms';
import { Observable } from 'rxjs';
import { FSUserRequest } from '../../../occ/occ-models';
import { FSUserRequestState } from '../store/user-request-state';
import * as fromSelector from '../store/selectors/user-request.selector';

@Injectable()
export class UserRequestService {
  constructor(
    protected store: Store<FSUserRequestState>,
    protected authService: AuthService,
    protected formDataStorageService: FormDataStorageService
  ) {}

  loadUserRequestFormData(userRequest: FSUserRequest) {
    userRequest.configurationSteps.forEach(stepData => {
      if (stepData.yformConfigurator) {
        this.formDataStorageService.setFormDataToLocalStorage(
          stepData.yformConfigurator
        );
      }
    });
  }

  getUserRequest(): Observable<any> {
    return this.store.select(fromSelector.getUserRequestContent);
  }
}
