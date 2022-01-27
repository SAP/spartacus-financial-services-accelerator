import { DebugElement, Input, Directive } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  CmsComponentConnector,
  ContentSlotComponentData,
  I18nTestingModule,
} from '@spartacus/core';
import { of } from 'rxjs';
import { CmsComponentData, SpinnerModule } from '@spartacus/storefront';
import { CmsCustomContainerComponent } from './cms-custom-container.component';
import { CMSCustomComponentsContainer } from '../../occ/occ-models';
import { ActivatedRoute } from '@angular/router';
@Directive({
  // eslint-disable-next-line
  selector: '[cxComponentWrapper]',
})
export class MockComponentWrapperDirective {
  @Input() cxComponentWrapper: ContentSlotComponentData;
}
class MockCmsComponentConnector {
  getList() {
    return mockComponentList;
  }
}
class MockActivatedRoute {
  params = of('pageContext');
}
const mockComponentList = of([
  {
    uid: 'ClaimActivePoliciesFlexComponent',
    uuid:
      'eyJpdGVtSWQiOiJDbGFpbUFjdGl2ZVBvbGljaWVzRmxleENvbXBvbmVudCIsImNhdGFsb2dJZCI6ImZpbmFuY2lhbENvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==',
    typeCode: 'CMSFlexComponent',
    modifiedTime: '2020-02-11T10:19:23+0000',
    name: 'ClaimActivePoliciesFlexComponent',
    container: 'false',
    flexType: 'ClaimActivePoliciesFlex',
  },
]);

describe('CmsCustomContainerComponent', () => {
  let component: CmsCustomContainerComponent;
  let fixture: ComponentFixture<CmsCustomContainerComponent>;
  let mockCmsComponentConnector: MockCmsComponentConnector;
  let el: DebugElement;

  const MockCmsComponentData: CmsComponentData<CMSCustomComponentsContainer> = {
    uid: 'ClaimStartPageContainer',
    data$: of({
      styleClasses: 'Test Class',
      simpleCMSComponents:
        'ClaimActivePoliciesFlexComponent claim_contact_agent_paragraph claim_description_paragraph claim_legal_notice_paragraph',
    }),
  };

  beforeEach(
    waitForAsync(() => {
      mockCmsComponentConnector = new MockCmsComponentConnector();
      TestBed.configureTestingModule({
        imports: [SpinnerModule, I18nTestingModule],
        declarations: [
          CmsCustomContainerComponent,
          MockComponentWrapperDirective,
        ],
        providers: [
          {
            provide: ActivatedRoute,
            useClass: MockActivatedRoute,
          },
          {
            provide: CmsComponentData,
            useValue: MockCmsComponentData,
          },
          {
            provide: CmsComponentConnector,
            useClass: MockCmsComponentConnector,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsCustomContainerComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return component list', () => {
    expect(component.components$).toEqual(mockComponentList);
  });

  it('should return container style class', () => {
    expect(component.styleCss).toEqual('Test Class');
  });
});
