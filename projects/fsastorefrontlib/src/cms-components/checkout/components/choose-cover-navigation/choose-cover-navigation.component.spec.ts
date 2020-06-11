import { Type } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { FormDataService, FormDataStorageService } from '@fsa/dynamicforms';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { of } from 'rxjs';
import { ChooseCoverNavigationComponent } from './choose-cover-navigation.component';
import createSpy = jasmine.createSpy;

class MockActivatedRoute {
  params = of();
}

class MockRoutingService {
  go = createSpy();
}

class MockFormDataStorageService {
  setFormDataToLocalStorage() {}
}

describe('ChooseCoverNavigationComponent', () => {
  let component: ChooseCoverNavigationComponent;
  let fixture: ComponentFixture<ChooseCoverNavigationComponent>;
  let mockFormDataStorageService: FormDataStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [ChooseCoverNavigationComponent],
      providers: [
        {
          provide: FormDataService,
          useValue: FormDataService,
        },
        {
          provide: RoutingService,
          useValue: MockRoutingService,
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute,
        },
        {
          provide: FormDataStorageService,
          useClass: MockFormDataStorageService,
        },
      ],
    }).compileComponents();
    mockFormDataStorageService = TestBed.get(
      FormDataStorageService as Type<FormDataStorageService>
    );
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCoverNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
