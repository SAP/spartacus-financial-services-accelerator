import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CmsComponentConnector, CmsModule } from '@spartacus/core';
import { of } from 'rxjs';
import { CmsComponentData, PageComponentModule, SpinnerModule } from '@spartacus/storefront';
import { CmsCustomContainerComponent } from './cms-custom-container.component';
import { CMSCustomComponentsContainer } from '../../occ/occ-models';
import { RouterTestingModule } from '@angular/router/testing';

const  mockComponentList = [
  { 
    uid: "ClaimActivePoliciesFlexComponent",
    uuid: "eyJpdGVtSWQiOiJDbGFpbUFjdGl2ZVBvbGljaWVzRmxleENvbXBvbmVudCIsImNhdGFsb2dJZCI6ImZpbmFuY2lhbENvbnRlbnRDYXRhbG9nIiwiY2F0YWxvZ1ZlcnNpb24iOiJPbmxpbmUifQ==",
    typeCode: "CMSFlexComponent",
    modifiedTime: "2020-02-11T10:19:23+0000",
    name: "ClaimActivePoliciesFlexComponent",
    container: "false",
    flexType: "ClaimActivePoliciesFlex"
  }
]
class MockActivatedRoute {
  snapshot = {
    queryParams: {
      forced: false,
    },
  };
}
class MockCmsComponentConnector {
  getList() {
    return mockComponentList;
  }
}
class MockReducerManager {
  addFeatures() {}
}

describe('ComparisonTableContainerComponent', () => {
  let component: CmsCustomContainerComponent;
  let fixture: ComponentFixture<CmsCustomContainerComponent>;
  let mockCmsComponentConnector: MockCmsComponentConnector;
  let el: DebugElement;

  const MockComponentData: CmsComponentData<CMSCustomComponentsContainer> = {
    uid: "ClaimStartPageContainer",
    data$: of({
      styleCss: "Test Class"
    })
  };

  beforeEach(async(() => {
    mockCmsComponentConnector = new MockCmsComponentConnector();
    TestBed.configureTestingModule({
      imports: [ 
        // PageComponentModule,
        CmsModule,
        // SpinnerModule,
        RouterTestingModule
      ],
      declarations: [
        CmsCustomContainerComponent
      ],
      providers: [
        // {
        //   provide: ActivatedRoute,
        //   useValue: MockActivatedRoute
        // },
        ,
        {
          provide: CmsComponentData,
          useValue: MockComponentData
        },
        {
          provide: CmsComponentConnector,
          useValue: mockCmsComponentConnector
        },
        // {
        //   provide: ReducerManager,
        //   useValue: MockReducerManager
        // }

      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsCustomContainerComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should return agent list', () => {
  //   component.components$.subscribe(result => {
  //     console.dir(result);
  //     console.log('///////////////////////////////////////');
  //     console.dir(mockComponentList);
  //     // expect(result).toEqual(mockComponentList);
  //   });
  // });

  // it('should return agent list', () => {
  //   // expect(component.styleCss).toEqual(MockComponentData.data$.subscribe( res =>{
  //   //   res.styleCss;
  //   // }));
  // });
});
