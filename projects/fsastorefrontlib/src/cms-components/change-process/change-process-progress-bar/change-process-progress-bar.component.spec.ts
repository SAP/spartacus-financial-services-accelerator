import { Component, Input, Pipe, PipeTransform } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import { of } from 'rxjs';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';
import { ChangeProcessProgressBarComponent } from './change-process-progress-bar.component';

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

@Component({
  // eslint-disable-next-line
  selector: 'cx-fs-progress-bar',
  template: '',
})
class MockProgressBarComponent {
  @Input() steps;
}

const mockChangeRequest = {
  requestId: 'testRequestId',
  insurancePolicy: {
    policyNumber: 'testPolicy',
    categoryData: {
      name: 'test category',
      code: 'testCategory',
    },
    configurationSteps: [
      {
        status: 'UNSET',
        pageLabelOrId: 'changeProcess-step1',
        name: 'Fist step',
      },
      {
        status: 'UNSET',
        pageLabelOrId: 'changeProcess-step2',
        name: 'Second step',
      },
    ],
  },
};

class MockChangeRequestService {
  getChangeRequest() {
    return of(mockChangeRequest);
  }
}

class MockLanguageService {
  getActive() {
    return of('en');
  }
}

describe('ChangeProcessProgressBarComponent', () => {
  let component: ChangeProcessProgressBarComponent;
  let fixture: ComponentFixture<ChangeProcessProgressBarComponent>;
  let mockLanguageService: LanguageService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule],
        providers: [
          { provide: ChangeRequestService, useClass: MockChangeRequestService },
          { provide: LanguageService, useClass: MockLanguageService },
        ],
        declarations: [
          MockUrlPipe,
          ChangeProcessProgressBarComponent,
          MockProgressBarComponent,
        ],
      }).compileComponents();
      mockLanguageService = TestBed.inject(LanguageService);
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProcessProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
