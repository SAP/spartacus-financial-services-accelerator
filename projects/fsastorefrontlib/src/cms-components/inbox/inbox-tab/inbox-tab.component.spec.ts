import { DebugElement } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CmsService } from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { InboxService } from '../../../core/inbox/facade/inbox.service';
import { CmsInboxTabComponent } from '../../../occ/occ-models/cms-component.models';
import { InboxTabComponent } from './inbox-tab.component';

const componentData: CmsInboxTabComponent = {
  uid: 'TestInboxTabContainer',
  typeCode: 'CMSInboxTabComponent',
};

class MockCmsService {
  getComponentData(): Observable<CmsInboxTabComponent> {
    return of(componentData);
  }
}

class MockInboxService {}

describe('InboxTabComponent', () => {
  let inboxTabComponent: InboxTabComponent;
  let mockInboxService: MockInboxService;
  let mockCmsService: MockCmsService;
  let fixture: ComponentFixture<InboxTabComponent>;
  let el: DebugElement;

  beforeEach(
    waitForAsync(() => {
      mockInboxService = new MockInboxService();
      mockCmsService = new MockCmsService();

      TestBed.configureTestingModule({
        declarations: [InboxTabComponent],
        providers: [
          {
            provide: InboxService,
            useValue: mockInboxService,
          },
          {
            provide: CmsService,
            useValue: mockCmsService,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(InboxTabComponent);
    inboxTabComponent = fixture.componentInstance;
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(inboxTabComponent).toBeTruthy();
  });

  it('should render tab', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.fs-tab'))).toBeTruthy();
  });
});
