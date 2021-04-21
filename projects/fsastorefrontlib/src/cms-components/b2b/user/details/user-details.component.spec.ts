import { Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule } from '@spartacus/core';
import {
  ItemExistsDirective,
  ItemService,
  MessageService,
  ToggleStatusModule,
} from '@spartacus/organization/administration/components';
import { Budget } from '@spartacus/organization/administration/core';
import { of, Subject } from 'rxjs';
import { FSUserDetailsComponent } from './user-details.component';
import createSpy = jasmine.createSpy;

const mockCode = 'c1';

class MockUserItemService implements Partial<ItemService<Budget>> {
  key$ = of(mockCode);
  load = createSpy('load').and.returnValue(of());
  error$ = of(false);
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform(): any {}
}

class MockMessageService {
  add() {
    return new Subject();
  }
  clear() {}
  close() {}
}

describe('FSUserDetailsComponent', () => {
  let component: FSUserDetailsComponent;
  let fixture: ComponentFixture<FSUserDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        I18nTestingModule,
        ToggleStatusModule,
      ],
      declarations: [FSUserDetailsComponent, ItemExistsDirective, MockUrlPipe],
      providers: [{ provide: ItemService, useClass: MockUserItemService }],
    })
      .overrideComponent(FSUserDetailsComponent, {
        set: {
          providers: [
            {
              provide: MessageService,
              useClass: MockMessageService,
            },
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(FSUserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
