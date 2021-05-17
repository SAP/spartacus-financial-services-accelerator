import { inject, TestBed } from '@angular/core/testing';
import { CmsService } from '@spartacus/core';
import { doesNotReject } from 'assert';
import { donnaMooreUser } from 'projects/fsastorefront-e2e-cypress/cypress/sample-data/users';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { CMSComparisonTabComponent } from './../../occ/occ-models/cms-component.models';
import { ComparisonTableService } from './comparison-table.service';

const componentData: CMSComparisonTabComponent = {
  uid: 'testComparisonTab',
  typeCode: '"CMSComparisonTabComponent"',
  comparisonPanel: {
    uid: 'testComparisonPanel',
    products: 'TEST_PRODUCT_1 TEST_PRODUCT_2',
  },
};

class MockCmsService {
  getComponentData(): Observable<CMSComparisonTabComponent> {
    return of(componentData);
  }
}

describe('ComparisonTableService', () => {
  let service: ComparisonTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ComparisonTableService,
        { provide: CmsService, useClass: MockCmsService },
      ],
    });
    service = TestBed.inject(ComparisonTableService);
  });

  it('should inject CmsService', inject(
    [CmsService],
    (cmsService: CmsService) => {
      expect(cmsService).toBeTruthy();
    }
  ));

  it('test set available tabs', () => {
    service.setAvailableTabs([componentData]);
    service.availableTab$
      .subscribe(result => {
        expect(result).toBe([componentData]);
      })
      .unsubscribe();
  });

  it('should get comparison table tab data', () => {
    const result: Observable<
      CMSComparisonTabComponent
    >[] = service.getComparisonTabs(['testComparisonTab']);
    expect(result.length).toEqual(1);
    result[0]
      .subscribe(comparisonTabData =>
        expect(comparisonTabData).toEqual(componentData)
      )
      .unsubscribe();
  });
});
