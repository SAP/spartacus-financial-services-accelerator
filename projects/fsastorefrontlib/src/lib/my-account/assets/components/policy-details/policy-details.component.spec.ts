import { PolicyDetailsComponent } from './policy-details.component';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { RoutingService, OccConfig } from '@spartacus/core';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { AccordionModule } from './../../../../accordion/accordion.module';
import { PolicyService } from '../../services';


class MockPolicyService {
    loadPolicyDetails(policyId: string, contractId: string): void {}
}

const MockOccModuleConfig: OccConfig = {
  site: {
    baseSite: ''
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
    let mockRoutingService: RoutingService;
    let el: DebugElement;
    let policyService: PolicyService;

    beforeEach(async(() => {
      mockRoutingService = <RoutingService>{
        getRouterState() {
          return of({
            state: {
              params: {
                policyId: '0000002',
                contractId: '0000002'
              }
            }
          });
        }
      };

      TestBed.configureTestingModule({
        imports: [
            AccordionModule
        ],
        providers: [
          { provide: RoutingService, useValue: mockRoutingService },
          { provide: PolicyService, useClass: MockPolicyService },
          { provide: OccConfig, useValue: MockOccModuleConfig }
        ],
        declarations: [
          PolicyDetailsComponent
        ]
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PolicyDetailsComponent);
      el = fixture.debugElement;
      policyService = TestBed.get(PolicyService);

      component = fixture.componentInstance;
      component.ngOnInit();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
