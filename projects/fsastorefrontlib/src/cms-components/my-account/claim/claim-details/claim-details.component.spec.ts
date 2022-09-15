import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {
  I18nTestingModule,
  RouterState,
  RoutingService,
} from '@spartacus/core';
import { ClaimService } from '../../../../core/my-account/facade/claim.service';
import { Observable, of } from 'rxjs';

import { ClaimDetailsComponent } from './claim-details.component';
import { AccordionModule } from '../../../../shared/accordion/accordion.module';
import { FileService } from '@spartacus/dynamicforms';
import * as FileSaver from 'file-saver';

const documentId = 'documentId';
const documentMime = 'mockMimeType';
const document = {
  code: documentId,
  mime: documentMime,
};

class MockClaimService {
  loadClaimById(_claimId) {}
  getCurrentClaim() {}
}

class MockRoutingService {
  go = jasmine.createSpy();

  getRouterState(): Observable<any> {
    return of({
      state: {
        params: {
          claimId: '0000002',
        },
      },
    });
  }
}

class MockFileService {
  getDocument(file) {
    return of(document);
  }
}

describe('ClaimDetailsComponent', () => {
  let component: ClaimDetailsComponent;
  let fixture: ComponentFixture<ClaimDetailsComponent>;
  let mockRoutingService: RoutingService;
  let mockClaimService: ClaimService;
  let mockFileService: FileService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AccordionModule, I18nTestingModule],
        providers: [
          { provide: RoutingService, useClass: MockRoutingService },
          { provide: ClaimService, useClass: MockClaimService },
          { provide: FileService, useClass: MockFileService },
        ],
        declarations: [ClaimDetailsComponent],
      }).compileComponents();

      mockRoutingService = TestBed.inject(RoutingService);
      mockClaimService = TestBed.inject(ClaimService);
      mockFileService = TestBed.inject(FileService);
    })
  );

  beforeEach(() => {
    spyOn(FileSaver, 'saveAs').and.stub();
    fixture = TestBed.createComponent(ClaimDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not load claim when claimId is not provided', () => {
    spyOn(mockClaimService, 'loadClaimById').and.stub();
    spyOn(mockRoutingService, 'getRouterState').and.returnValue(
      of({
        state: {
          params: {},
        },
      } as RouterState)
    );
    expect(mockClaimService.loadClaimById).not.toHaveBeenCalled();
  });
});
