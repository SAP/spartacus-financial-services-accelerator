import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RoutingService, I18nTestingModule } from '@spartacus/core';
import { Type, Component, Input, PipeTransform, Pipe } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ContactAgentFormComponent } from './contact-agent-form.component';
import { RouterTestingModule } from '@angular/router/testing';


@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() { }
}

describe('ContactAgentFormComponent', () => {
  let component: ContactAgentFormComponent;
  let fixture: ComponentFixture<ContactAgentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactAgentFormComponent, MockUrlPipe],
      imports: [I18nTestingModule, , RouterTestingModule],
      providers: [
        {
          provide: RoutingService,
          useValue: { go: jasmine.createSpy() },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAgentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
