import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeparatorComponent } from './separator.component';
import { OccFormService } from '../../occ/services/occ-form.service';
import { DynamicFormsConfig } from '../../core/config/form-config';
import { of } from 'rxjs';
import { LanguageService } from '@spartacus/core';

class MockOccFormService {}

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {},
};

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

describe('SeparatorComponent', () => {
  let component: SeparatorComponent;
  let fixture: ComponentFixture<SeparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeparatorComponent],
      providers: [
        { provide: OccFormService, useClass: MockOccFormService },
        { provide: LanguageService, useClass: MockLanguageService },
        {
          provide: DynamicFormsConfig,
          useValue: mockDynamicFormsConfig,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
