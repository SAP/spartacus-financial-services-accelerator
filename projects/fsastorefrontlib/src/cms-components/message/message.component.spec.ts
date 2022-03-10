import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GlobalMessageType } from '@spartacus/core';
import { of } from 'rxjs';

import { FSMessageComponent } from './message.component';

describe('FSMessageComponent', () => {
  let component: FSMessageComponent;
  let fixture: ComponentFixture<FSMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FSMessageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FSMessageComponent);
    component = fixture.componentInstance;
    component.messageText$ = of('Test message');
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set message type class', () => {
    component.type = GlobalMessageType.MSG_TYPE_CONFIRMATION;
    expect(component.messageCssClass).toEqual('success');
  });

  it('should close message', () => {
    component.close();
    component.showMessage$
      .subscribe(showMessage => {
        expect(showMessage).toBe(false);
      })
      .unsubscribe();
  });
});
