import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalMessageService, GlobalMessageType } from '@spartacus/core';
import { DefaultFormValidators } from '@spartacus/dynamicforms';
import { ConsentConnector } from '../../../core/my-account/connectors/consent.connector';
import { Title, UserProfileFacade } from '@spartacus/user/profile/root';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class CreateOBOCustomerComponentService {
  constructor(
    protected userProfile: UserProfileFacade,
    protected globalMessageService: GlobalMessageService,
    protected consentConnector: ConsentConnector
  ) {}

  protected busy$ = new BehaviorSubject(false);

  titles$: Observable<Title[]> = this.userProfile.getTitles();

  form: FormGroup = new FormGroup({
    email: new FormControl('', Validators.required),
    titleCode: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', [
      DefaultFormValidators.required,
      DefaultFormValidators.dateOfBirthValidator(18),
      Validators.min(1900),
    ]),
  });

  /**
   * Creates the On-Behalf-Of user's details and handles the UI.
   */
  createCustomerByConsentHolder(consentHolder: string): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.busy$.next(true);
    this.consentConnector
      .createOBOCustomer(consentHolder, this.form.value)
      .subscribe({
        next: () => this.onSuccess(),
        error: (error: Error) => this.onError(error),
      });
  }

  protected onSuccess(): void {
    this.globalMessageService.add(
      {
        key: 'fscommon.userCreatedSuccess',
      },
      GlobalMessageType.MSG_TYPE_CONFIRMATION
    );

    this.busy$.next(false);
    this.form.reset();
  }

  protected onError(_error: Error): void {
    this.busy$.next(false);
  }
}
