import { TestBed } from '@angular/core/testing';

import { ComparisonTableService } from './comparison-table.service';
import { CmsService } from '@spartacus/core';

class MockCmsService {
  getComponentData(componentId: string): void {}
}

describe('ComparisonTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    let service: ComparisonTableService;

    TestBed.configureTestingModule({
      providers: [
        ComparisonTableService,
        { provide: CmsService, useClass: MockCmsService },
      ],
    });

    service = TestBed.get(ComparisonTableService);
  });
});
