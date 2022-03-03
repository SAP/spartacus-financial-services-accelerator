import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, RoutingService } from '@spartacus/core';
import { CreateClaimComponent } from './create-claim.component';
import { ClaimService } from '../../../../core/my-account/facade/claim.service';
import { FormsModule } from '@angular/forms';
import { FileService } from '@spartacus/dynamicforms';
import { StoreModule } from '@ngrx/store';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { SelectedPolicy } from '../../../../core/my-account/services';
import createSpy = jasmine.createSpy;

class MockRoutingService {
  go = createSpy();
}

const selectedPolicy: BehaviorSubject<SelectedPolicy> = new BehaviorSubject(
  null
);

class MockClaimService {
  createClaim = createSpy();
  resetSelectedPolicy() {}
  getSelectedPolicy() {
    return selectedPolicy.asObservable();
  }
}

class MockFileService {
  uploadFile(file: File): Observable<any> {
    return of();
  }
  resetFiles(): void {}
  setFileInStore(body: any) {}
  getUploadedDocuments(): Observable<any> {
    return of();
  }
}

const mockSelectedPolicy: SelectedPolicy = {
  userId: 'testUser',
  policyId: 'testPolicy',
  contractId: 'testContract',
};

describe('CreateClaimComponent', () => {
  let component: CreateClaimComponent;
  let fixture: ComponentFixture<CreateClaimComponent>;
  let mockClaimService: MockClaimService;
  let mockRoutingService: MockRoutingService;
  let mockFileService: FileService;

  beforeEach(
    waitForAsync(() => {
      mockClaimService = new MockClaimService();
      mockRoutingService = new MockRoutingService();
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, FormsModule, StoreModule.forRoot({})],
        providers: [
          { provide: ClaimService, useValue: mockClaimService },
          { provide: FileService, useClass: MockFileService },
          { provide: RoutingService, useValue: mockRoutingService },
        ],
        declarations: [CreateClaimComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    mockFileService = TestBed.inject(FileService);
    fixture = TestBed.createComponent(CreateClaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prevent start claim', () => {
    selectedPolicy.next(null);
    expect(component.startClaim()).toEqual(undefined);
  });

  it('should start claim', () => {
    component.confirm = true;
    selectedPolicy.next(mockSelectedPolicy);
    component.startClaim();
    expect(mockClaimService.createClaim).toHaveBeenCalledWith(
      mockSelectedPolicy.policyId,
      mockSelectedPolicy.contractId
    );
    expect(mockRoutingService.go).toHaveBeenCalledWith({
      cxRoute: 'fnolIncidentPage',
    });
  });

  it('should not start claim if it is not confirmed', () => {
    component.confirm = false;
    component.startClaim();
    expect(mockClaimService.createClaim).not.toHaveBeenCalled();
    expect(mockRoutingService.go).not.toHaveBeenCalled();
  });

  it('should unsubscribe from any subscriptions when destroyed', () => {
    const subscriptions = component['subscription'];
    spyOn(subscriptions, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(subscriptions.unsubscribe).toHaveBeenCalled();
  });
});
