import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';
import { FSUserRequest } from '../../../occ/occ-models';
import { FSClaimState } from '../store/claim-state';
import * as fromSelector from '../store/selectors/claim.selector';
import { FormDataStorageService } from '@fsa/dynamicforms';

@Injectable()
export class UserRequestService {
  constructor(
    protected store: Store<FSClaimState>,
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

  getClaim(): Observable<any> {
    return this.store.select(fromSelector.getLoaded).pipe(
      filter(loaded => loaded),
      take(1),
      switchMap(_ => {
        return this.store.select(fromSelector.getClaimContent);
      })
    );
  }
}
