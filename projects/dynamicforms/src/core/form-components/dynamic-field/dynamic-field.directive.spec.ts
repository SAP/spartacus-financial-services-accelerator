import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, ViewContainerRef } from '@angular/core';
import { DynamicFieldDirective } from './dynamic-field.directive';
import { FormConfig } from '../../config';
import { FormButtonComponent } from './../form-button/form-button.component';
import { FieldConfig } from 'dynamicforms/src/core';


@Component({
    template: `
    <div>
        <ng-container
        cxDynamicField
        [config]="filed"
        [group]="group"
        >
        </ng-container>
    </div>
  `,
})
class TestDynamicFormComponent {
    filed: FieldConfig = {
        name: 'test',
        type: 'button'
    };
}

class MockedButtonComponent { }

// class MockViewContainerRef {
//     createComponent() {
//         return mockedButtonComponent;
//     }
// }

const MockFormConfig: FormConfig = {
    components: {
        button: {
            component: FormButtonComponent
        }
    }
};


describe('Directive: DynamicField', () => {
  let fixture: ComponentFixture<TestDynamicFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestDynamicFormComponent, DynamicFieldDirective],
      providers: [{ provide: FormConfig, useValue: MockFormConfig },
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
