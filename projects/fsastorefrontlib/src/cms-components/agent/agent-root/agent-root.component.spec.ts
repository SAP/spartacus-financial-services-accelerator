import { DebugElement, PipeTransform, Pipe } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { I18nTestingModule, CmsComponent } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';

import { AgentRootComponent } from './agent-root.component';
import { AccordionModule } from '../../../shared/accordion/accordion.module';
import { CmsAgentRootComponent } from '../../../occ/occ-models';
import { AgentConnector } from '../../../core/agent/connectors/agent.connector';

@Component({
  // eslint-disable-next-line
  selector: 'cx-media',
  template: '',
})
class MockMediaComponent {
  @Input() container;
  @Input() format;
}

const mockedAgentList = {
  agents: [
    {
      email: 'testagent1@test.com',
      displayName: 'Test agent 1',
    },
    {
      email: 'testagent2@test.com',
      displayName: 'Test agent 2',
    },
  ],
};

export class MockOccAgentConnector {
  getAgentsByCategory(): Observable<Object> {
    return new BehaviorSubject(mockedAgentList);
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('AgentRootComponent', () => {
  let component: AgentRootComponent;
  let fixture: ComponentFixture<AgentRootComponent>;
  let mockOccAgentAConnector: MockOccAgentConnector;
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

  beforeEach(
    waitForAsync(() => {
      mockOccAgentAConnector = new MockOccAgentConnector();
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, AccordionModule, RouterTestingModule],
        declarations: [AgentRootComponent, MockUrlPipe, MockMediaComponent],
        providers: [
          {
            provide: CmsComponentData,
            useValue: MockCmsComponentData,
          },
          {
            provide: AgentConnector,
            useValue: mockOccAgentAConnector,
          },
        ],
      }).compileComponents();
    })
  );

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
    component.agentList$
      .subscribe(result => {
        expect(result).toEqual(mockedAgentList);
      })
      .unsubscribe();
  });
});
