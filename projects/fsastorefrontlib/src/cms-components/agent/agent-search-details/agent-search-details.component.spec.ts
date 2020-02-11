import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentSearchDetailsComponent } from './agent-search-details.component';
import { of } from 'rxjs';
import { AgentSearchService } from '../../../core/agent/services/agent-search.service';
import { Component, Input, PipeTransform, Pipe } from '@angular/core';
import { I18nTestingModule } from '@spartacus/core';
import { RouterTestingModule } from '@angular/router/testing';

const agent = {};

class MockAgentSearchService {
  getAgent() {
    of(agent);
  }
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

@Component({
  // tslint:disable
  selector: 'cx-media',
  template: '',
})
class MockMediaComponent {
  @Input() container;
}

@Component({
  // tslint:disable
  selector: 'cx-store-finder-map',
  template: '',
})
class MockMapComponent {
  @Input() locations: any;
}

describe('AgentSearchDetailsComponent', () => {
  let component: AgentSearchDetailsComponent;
  let fixture: ComponentFixture<AgentSearchDetailsComponent>;
  let mockSearchService: MockAgentSearchService;

  beforeEach(async(() => {
    mockSearchService = new MockAgentSearchService();
    TestBed.configureTestingModule({
      imports: [I18nTestingModule, RouterTestingModule],
      providers: [
        {
          provide: AgentSearchService,
          useValue: mockSearchService,
        },
      ],
      declarations: [
        AgentSearchDetailsComponent,
        MockMediaComponent,
        MockMapComponent,
        MockUrlPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentSearchDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
