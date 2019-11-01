import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryFeatureCarouselComponent } from './category-feature-carousel.component';
import {
  CmsCategoryFeatureCarouselComponent,
  CmsComponent,
} from '../../../occ/occ-models';
import { CmsComponentData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { Component, Input, Directive } from '@angular/core';
import { CmsService, ContentSlotComponentData } from '@spartacus/core';

@Component({
  // tslint:disable
  selector: 'cx-carousel',
  template: '',
})
class MockCarouselComponent {
  @Input() items;
  @Input() title;
  @Input() template;
  itemWidth;
}

@Directive({
  // tslint:disable
  selector: '[cxComponentWrapper]',
})
export class MockComponentWrapperDirective {
  @Input() cxComponentWrapper: ContentSlotComponentData;
}

class MockCmsService {
  getComponentData() {
    return 'MockedCmsComponent';
  }
}

describe('CategoryCarouselComponent', () => {
  let component: CategoryFeatureCarouselComponent;
  let fixture: ComponentFixture<CategoryFeatureCarouselComponent>;

  const componentData: CmsCategoryFeatureCarouselComponent = {
    uid: 'TestCmsCategoryFeatureCarouselComponent',
    typeCode: 'FSCategoryFeatureCarouselComponent',
    name: 'Test Cms Category Feature Carousel Component',
    categoryFeatures: 'Feature1 Feature2',
  };

  const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
    data$: of(componentData),
    uid: 'test',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryFeatureCarouselComponent,
        MockCarouselComponent,
        MockComponentWrapperDirective,
      ],
      providers: [
        {
          provide: CmsComponentData,
          useValue: MockCmsComponentData,
        },
        {
          provide: CmsService,
          useValue: MockCmsService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFeatureCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
