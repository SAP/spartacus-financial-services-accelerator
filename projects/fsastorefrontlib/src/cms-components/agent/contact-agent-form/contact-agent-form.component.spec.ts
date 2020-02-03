import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAgentFormComponent } from './contact-agent-form.component';

describe('ContactAgentFormComponent', () => {
  let component: ContactAgentFormComponent;
  let fixture: ComponentFixture<ContactAgentFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactAgentFormComponent ]
    })
    .compileComponents();
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
