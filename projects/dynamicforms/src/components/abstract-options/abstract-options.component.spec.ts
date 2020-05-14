import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractOptionsComponent } from './abstract-options.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OccMockFormService } from '../../occ/services/occ-mock-form.service';
import { LanguageService } from '@spartacus/core';
import { DynamicFormsConfig } from '../../core';
import { of } from 'rxjs';

class MockOccFormService {}
class MockLanguageService {
  getActive() {
    return of('en');
  }
}

const mockLocalizationObj = {
  en: 'Test en',
  de: 'Test de',
};

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

describe('AbstractOptionsComponent', () => {
  let component: AbstractOptionsComponent;
  let fixture: ComponentFixture<AbstractOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AbstractOptionsComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: OccMockFormService, useClass: MockOccFormService },
        { provide: LanguageService, useClass: MockLanguageService },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check localizedoption when laguage is set to en', () => {
    const localizedOption = component.getLocalizedOption(
      mockLocalizationObj,
      'en'
    );
    expect(localizedOption).toEqual(mockLocalizationObj.en);
  });

  it('should check localizedoption when laguage is set to de', () => {
    const localizedOption = component.getLocalizedOption(
      mockLocalizationObj,
      'de'
    );
    expect(localizedOption).toEqual(mockLocalizationObj.de);
  });
});
