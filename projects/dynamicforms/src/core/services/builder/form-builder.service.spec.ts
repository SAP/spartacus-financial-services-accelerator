import { TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { I18nTestingModule } from '@spartacus/core';
import { reducerProvider, reducerToken } from '../../store/reducers';
import { FormBuilderService } from './form-builder.service';
import { FormBuilder } from '@angular/forms';
import { FormValidationService } from '../form-validation/form-validation.service';
import { FieldConfig } from '../../models/form-config.interface';
import { FieldDependencyResolverService } from '../form-dependencies/field-dependency-resolver.service';
import { of } from 'rxjs';
import { UserAccountFacade } from '@spartacus/user/account/root';

class MockFormValidationService {
  getValidatorsForField(fieldConfig: FieldConfig) {
    return [];
  }
}

const mockUser = {
  firstName: 'testFirstName',
  lastName: 'testLastName',
  roles: [],
};

class MockUserAccountFacade {
  get() {
    return of(mockUser);
  }
}

class MockFieldDependencyResolverService {
  resolveFormControlDependencies() {}
}

describe('FormDataService', () => {
  let service: FormBuilderService;
  let mockedUserAccountFacade: UserAccountFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        I18nTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('form', reducerToken),
      ],
      providers: [
        FormBuilderService,
        reducerProvider,
        FormBuilder,
        { provide: FormValidationService, useClass: MockFormValidationService },
        {
          provide: FieldDependencyResolverService,
          useClass: MockFieldDependencyResolverService,
        },
        { provide: UserAccountFacade, useClass: MockUserAccountFacade },
      ],
    });

    mockedUserAccountFacade = TestBed.inject(UserAccountFacade);
    service = TestBed.inject(FormBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a form', () => {
    const mockConfig = {
      formGroups: [
        {
          groupCode: 'currentAccount',
          dependsOn: {},
          fieldConfigs: [
            {
              fieldType: 'input',
              name: 'accountType',
              label: {
                en: 'Account Type',
                de: 'Kontotyp',
              },
            },
            {
              fieldType: 'input',
              name: 'cardDesign',
              label: {
                en: 'Choose a design for your debit card',
                de: 'Wählen Sie das Design Ihrer Girokarte',
              },
              dependsOn: {},
            },
          ],
        },
      ],
    };
    const form = service.createForm(mockConfig);
    expect(form.controls).toEqual(jasmine.any(Object));
    expect(form.controls.currentAccount.get('accountType')).not.toBe(null);
    expect(form.controls.currentAccount.get('cardDesign')).not.toBe(null);
    expect(form.controls.currentAccount.get('notExistingControl')).toBe(null);
  });

  it('should create a form without dependsOn property in configuration', () => {
    const mockConfig = {
      formGroups: [
        {
          groupCode: 'currentAccount',
          fieldConfigs: [
            {
              fieldType: 'input',
              name: 'accountType',
              label: {
                en: 'Account Type',
                de: 'Kontotyp',
              },
            },
            {
              fieldType: 'input',
              name: 'cardDesign',
              label: {
                en: 'Choose a design for your debit card',
                de: 'Wählen Sie das Design Ihrer Girokarte',
              },
            },
          ],
        },
      ],
    };
    const form = service.createForm(mockConfig);
    expect(form.controls).toEqual(jasmine.any(Object));
    expect(form.controls.currentAccount.get('accountType')).not.toBe(null);
    expect(form.controls.currentAccount.get('cardDesign')).not.toBe(null);
    expect(form.controls.currentAccount.get('notExistingControl')).toBe(null);
  });

  it('should create a form without grupCode defined', () => {
    const mockConfig = {
      formGroups: [
        {
          fieldConfigs: [
            {
              fieldType: 'input',
              name: 'accountType',
              label: {
                en: 'Account Type',
                de: 'Kontotyp',
              },
            },
            {
              fieldType: 'input',
              name: 'cardDesign',
              label: {
                en: 'Choose a design for your debit card',
                de: 'Wählen Sie das Design Ihrer Girokarte',
              },
            },
          ],
        },
      ],
    };
    const form = service.createForm(mockConfig);
    expect(form.controls).toEqual(jasmine.any(Object));
    expect(form.controls.accountType).not.toBe(null);
    expect(form.controls.cardDesign).not.toBe(null);
  });
});
