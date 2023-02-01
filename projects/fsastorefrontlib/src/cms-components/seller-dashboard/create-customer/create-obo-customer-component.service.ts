import { Injectable } from '@angular/core';
import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { DefaultFormValidators } from '@spartacus/dynamicforms';
import { ConsentConnector } from '../../../core/my-account/connectors/consent.connector';
import { Title, UserProfileFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';
import { CustomFormValidators } from '@spartacus/storefront';

@Injectable({ providedIn: 'root' })
export class CreateOBOCustomerComponentService {
  constructor(
    protected userProfile: UserProfileFacade,
    protected globalMessageService: GlobalMessageService,
    protected consentConnector: ConsentConnector
  ) {}

  protected busy$ = new BehaviorSubject(false);

  titles$: Observable<Title[]> = this.userProfile.getTitles();

  form: UntypedFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', [
      Validators.required,
      CustomFormValidators.emailValidator,
    ]),
    titleCode: new UntypedFormControl('', Validators.required),
    firstName: new UntypedFormControl('', Validators.required),
    lastName: new UntypedFormControl('', Validators.required),
    dateOfBirth: new UntypedFormControl('', [
      DefaultFormValidators.required,
      DefaultFormValidators.dateOfBirthValidator(18),
      Validators.min(1900),
    ]),
  });

  /**
   * Creates the On-Behalf-Of user's details and handles the UI.
   */
  createCustomerByConsentHolder(consentHolder: string): Observable<any> {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);
    return this.consentConnector.createOBOCustomer(
      consentHolder,
      this.form.value
    );
  }

  onSuccess(): void {
    this.globalMessageService.add(
      {
        key: 'fscommon.userCreatedSuccess',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );

    this.busy$.next(false);
    this.form.reset();
  }

  onError(_error: Error): void {
    this.busy$.next(false);
  }
}
