import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { FormComponentDirective } from './form-component.directive';
import { FormConfig } from '../core/config';
import { ButtonComponent } from './button/button.component';
import { FieldConfig } from 'dynamicforms/src/core';

@Component({
  template: `
    <div>
      <ng-container cxFormComponent [config]="filed" [group]="group">
      </ng-container>
    </div>
  `,
})
class TestDynamicFormComponent {
  filed: FieldConfig = {
    name: 'test',
    type: 'button',
  };
}

@Component({
  template: '<ng-container [cxFormComponent]="component">' + '</ng-container>',
})
class MockedButtonComponent {}

const MockFormConfig: FormConfig = {
  components: {
    button: {
      component: ButtonComponent,
    },
  },
  cssClass: {
    input: 'testInput',
  },
};

describe('Directive: DynamicField', () => {
  let fixture: ComponentFixture<TestDynamicFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDynamicFormComponent, FormComponentDirective],
      providers: [
        { provide: FormConfig, useValue: MockFormConfig },
        // {provide: ViewContainerRef, useValue: MockViewContainerRef}
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestDynamicFormComponent);
  });

  it('should create an instance', () => {
    fixture.detectChanges();
    // expect(directive).toBeTruthy();
  });
});
