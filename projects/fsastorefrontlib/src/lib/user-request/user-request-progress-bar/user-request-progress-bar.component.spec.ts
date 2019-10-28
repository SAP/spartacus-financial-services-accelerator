import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserRequestProgressBarComponent } from './user-request-progress-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nTestingModule } from '@spartacus/core';
import { Pipe, PipeTransform } from '@angular/core';

describe('UserRequestProgressBarComponent', () => {
  let component: UserRequestProgressBarComponent;
  let fixture: ComponentFixture<UserRequestProgressBarComponent>;

  class MockStore {
    pipe() {}
  }
  @Pipe({
    name: 'cxUrl',
  })
  class MockUrlPipe implements PipeTransform {
    transform() {}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, I18nTestingModule],
      declarations: [UserRequestProgressBarComponent, MockUrlPipe],
      providers: [{ provide: Store, useClass: MockStore }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRequestProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
