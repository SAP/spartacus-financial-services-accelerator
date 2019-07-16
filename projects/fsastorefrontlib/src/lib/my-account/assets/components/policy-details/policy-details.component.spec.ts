import { PolicyDetailsComponent } from './policy-details.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RoutingService, OccConfig, I18nTestingModule } from '@spartacus/core';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { AccordionModule } from './../../../../accordion/accordion.module';
import { PolicyService } from '../../services';


class MockPolicyService {
    loadPolicyDetails(policyId: string, contractId: string): void {}
}

class MockRoutingService {
  getRouterState() {
    return of({
      state: {
        params: {
          policyId: '0000002',
          contractId: '0000002'
        },
      },
    });
  }
}

const MockOccModuleConfig: OccConfig = {
  context: {
    baseSite: [
      ''
    ]
  },
  backend: {
    occ: {
      baseUrl: '',
      prefix: ''
    }
  }
};

describe('PolicyDetailsComponent', () => {
    let component: PolicyDetailsComponent;
    let fixture: ComponentFixture<PolicyDetailsComponent>;

    beforeEach(() => {

      TestBed.configureTestingModule({
        imports: [
            AccordionModule,
            I18nTestingModule
        ],
        providers: [
          { provide: RoutingService, useValue: MockRoutingService },
          { provide: PolicyService, useClass: MockPolicyService },
          { provide: OccConfig, useValue: MockOccModuleConfig },

        ],
        declarations: [
          PolicyDetailsComponent
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(PolicyDetailsComponent);

      component = fixture.componentInstance;
      component.ngOnInit();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
