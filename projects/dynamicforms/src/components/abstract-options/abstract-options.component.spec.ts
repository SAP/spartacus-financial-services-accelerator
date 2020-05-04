import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbstractOptionsComponent } from './abstract-options.component';

describe('AbstractOptionsComponent', () => {
  let component: AbstractOptionsComponent;
  let fixture: ComponentFixture<AbstractOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbstractOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbstractOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
