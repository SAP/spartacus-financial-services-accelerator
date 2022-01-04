import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  GlobalMessageService,
  GlobalMessageType,
  I18nTestingModule,
  User,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { UserProfileFacade } from '@spartacus/user/profile/root';
import { of } from 'rxjs';
import { CreateOBOCustomerComponentService } from './create-obo-customer-component.service';
import createSpy = jasmine.createSpy;
import { ConsentConnector } from '../../../core/my-account/connectors/consent.connector';

const consentHolderId = 'consent@holder.com';

const mockUser = {
  customerId: 'testId',
  firstName: 'Test First Name',
  lastName: 'Test Last Name',
  email: 'test@email.com',
  titleCode: 'Mr.',
  dateOfBirth: '1991-01-01',
};

class MockUserProfileFacade implements Partial<UserProfileFacade> {
  getTitles = createSpy('UserProfileFacade.getTitles').and.returnValue(of());
}
class MockGlobalMessageService {
  add = createSpy().and.stub();
}

class MockConsentConnector {
  createOBOCustomer() {
    return of(mockUser);
  }
}
describe('CreateOBOCustomerComponentService', () => {
  let service: CreateOBOCustomerComponentService;
  let userService: UserProfileFacade;
  let globalMessageService: GlobalMessageService;
  let consentConnector: ConsentConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, I18nTestingModule, FormErrorsModule],
      providers: [
        CreateOBOCustomerComponentService,
        {
          provide: GlobalMessageService,
          useClass: MockGlobalMessageService,
        },
        {
          provide: UserProfileFacade,
          useClass: MockUserProfileFacade,
        },
        {
          provide: ConsentConnector,
          useClass: MockConsentConnector,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(CreateOBOCustomerComponentService);
    userService = TestBed.inject(UserProfileFacade);
    globalMessageService = TestBed.inject(GlobalMessageService);
    consentConnector = TestBed.inject(ConsentConnector);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  describe('save()', () => {
    describe('success', () => {
      beforeEach(() => {
        service.form.patchValue(mockUser);
      });

      it('should save customer details', () => {
        spyOn(consentConnector, 'createOBOCustomer').and.callThrough();
        console.log('save custoemr details');
        service.createCustomerByConsentHolder(consentHolderId);
        expect(consentConnector.createOBOCustomer).toHaveBeenCalled();
      });

      it('should show message', () => {
        service.createCustomerByConsentHolder(consentHolderId);
        expect(globalMessageService.add).toHaveBeenCalledWith(
          {
            key: 'fscommon.userCreatedSuccess',
          },
          GlobalMessageType.MSG_TYPE_CONFIRMATION
        );
      });

      it('reset()', () => {
        spyOn(service.form, 'reset').and.callThrough();
        service.createCustomerByConsentHolder(consentHolderId);
        expect(service.form.reset).toHaveBeenCalled();
      });
    });
  });
  describe('error', () => {
    it('should not save invalid form', () => {
      spyOn(consentConnector, 'createOBOCustomer').and.callThrough();
      service.form.patchValue({ customerId: '123' } as User);
      service.createCustomerByConsentHolder(consentHolderId);
      expect(consentConnector.createOBOCustomer).not.toHaveBeenCalled();
    });
  });
});
