import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFeatureComponent } from './category-feature.component';
import { Component, Input, PipeTransform, Pipe } from '@angular/core';
import { CmsCategoryFeatureComponent, CmsComponent } from '../../occ-models';
import { CmsComponentData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  // tslint:disable
  selector: 'cx-media',
  template: '',
})
class MockMediaComponent {
  @Input() container;
}

@Pipe({
  name: 'cxUrl',
})
class MockUrlPipe implements PipeTransform {
  transform() {}
}

describe('CategoryFeatureComponent', () => {
  let component: CategoryFeatureComponent;
  let fixture: ComponentFixture<CategoryFeatureComponent>;

  const componentData: CmsCategoryFeatureComponent = {
    uid: 'TestCategoryFeatureComponent',
    typeCode: 'CategoryFeatureComponent',
    name: 'Test Category Feature Component',
    media: {
      code: '/images/category-feature.jpg',
      mime: 'image/svg+xml',
      altText: 'Category Feature Component',
      url: '/medias/category-feature.jpg',
    },
  };

  const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
    data$: of(componentData),
    uid: 'test',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [CategoryFeatureComponent, MockMediaComponent, MockUrlPipe],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
