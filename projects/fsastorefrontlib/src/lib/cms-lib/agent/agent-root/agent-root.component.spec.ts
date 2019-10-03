import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, CmsComponent } from '@spartacus/core';
import { MediaModule, CmsComponentData } from '@spartacus/storefront';
import { of, Observable, BehaviorSubject } from 'rxjs';

import { AgentRootComponent } from './agent-root.component';
import { AccordionModule } from '../../../accordion/accordion.module';
import { CmsAgentRootComponent } from '../../../occ-models';
import { OccAgentService } from '../../../occ/agent/agent.service';

const mockedAgentList = ['testAgent'];

export class MockOccAgentService {
  getAgentsByCategory(): Observable<Object> {
    return new BehaviorSubject(mockedAgentList);
  }
}

describe('AgentRootComponent', () => {
  let component: AgentRootComponent;
  let fixture: ComponentFixture<AgentRootComponent>;
  let mockOccAgentService: MockOccAgentService;
  let el: DebugElement;

  const componentData: CmsAgentRootComponent = {
    agentRootCategory: 'testCategory',
    name: 'Test Root Component',
    uid: 'testUid',
  };

  const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
    data$: of(componentData),
    uid: 'testComponent',
  };

  beforeEach(async(() => {
    mockOccAgentService = new MockOccAgentService();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, AccordionModule, MediaModule],
      declarations: [AgentRootComponent],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
        {
          provide: OccAgentService,
          useValue: mockOccAgentService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return agent list', () => {
    component.agentList$.subscribe(result => {
      expect(result).toEqual(mockedAgentList);
    });
  });
});
