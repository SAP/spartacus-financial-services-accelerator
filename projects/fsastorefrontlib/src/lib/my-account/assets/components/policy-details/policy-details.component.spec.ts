import { PolicyDetailsComponent } from './policy-details.component';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { RoutingService, OccConfig, I18nTestingModule } from '@spartacus/core';
import { of, Observable } from 'rxjs';
import { AccordionModule } from './../../../../accordion/accordion.module';
import { PolicyService } from '../../services';


class MockPolicyService {
    loadPolicyDetails(policyId: string, contractId: string): void {}
}

class MockRoutingService {
  getRouterState(): Observable<any> {
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

    beforeEach(async(() => {

      TestBed.configureTestingModule({
        imports: [
            AccordionModule,
            I18nTestingModule
        ],
        providers: [
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: PolicyService, useClass: MockPolicyService },
          { provide: OccConfig, useValue: MockOccModuleConfig },

        ],
        declarations: [
          PolicyDetailsComponent
        ]
      }).compileComponents();  
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(PolicyDetailsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      component.ngOnInit();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
