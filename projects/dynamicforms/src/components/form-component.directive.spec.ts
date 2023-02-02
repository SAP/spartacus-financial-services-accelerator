import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, NgModule } from '@angular/core';
import { FormComponentDirective } from './form-component.directive';
import { DynamicFormsConfig } from '../core/config';
import { FieldConfig } from './../core/models/form-config.interface';

@Component({
  template: `
    <div>
      <ng-container cxFormComponent [config]="field" [group]="group">
      </ng-container>
    </div>
  `,
})
class TestDynamicFormComponent {
  field: FieldConfig = {
    name: 'test',
    fieldType: 'button',
  };
  component: any;
}

@Component({
  template: '',
})
class MockedButtonComponent {}

const mockDynamicFormsConfig: DynamicFormsConfig = {
  dynamicForms: {
    components: {
      button: {
        component: MockedButtonComponent,
      },
    },
  },
};

@NgModule({
  declarations: [MockedButtonComponent],
  exports: [MockedButtonComponent],
})
class TestModule {}

describe('FormCmponentDirective', () => {
  let fixture: ComponentFixture<TestDynamicFormComponent>;
  let testDynamicFormComponent: TestDynamicFormComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestModule],
      declarations: [TestDynamicFormComponent, FormComponentDirective],
      providers: [
        { provide: DynamicFormsConfig, useValue: mockDynamicFormsConfig },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TestDynamicFormComponent);
    testDynamicFormComponent = fixture.componentInstance;
  });

  it('should create an instance', () => {
    fixture.detectChanges();
    expect(testDynamicFormComponent).toBeTruthy();
  });

  it('should not render component', () => {
    testDynamicFormComponent.field = {
      name: 'test',
      fieldType: 'unknown',
    };
    expect(() => fixture.detectChanges()).toThrowError();
  });
});
