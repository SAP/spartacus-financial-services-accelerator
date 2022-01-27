import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFeatureComponent } from './category-feature.component';
import { Component, Input, PipeTransform, Pipe } from '@angular/core';
import { CmsCategoryFeatureComponent } from '../../../occ/occ-models';
import { CmsComponentData } from '@spartacus/storefront';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { I18nTestingModule, CmsService, CmsComponent } from '@spartacus/core';

@Component({
  // eslint-disable-next-line
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

const MockCmsService = {
  getComponentData: () => of(componentData),
};

const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
  data$: of(componentData),
  uid: 'test',
};

describe('CategoryFeatureComponent', () => {
  let component: CategoryFeatureComponent;
  let fixture: ComponentFixture<CategoryFeatureComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [I18nTestingModule, RouterTestingModule],
        declarations: [
          CategoryFeatureComponent,
          MockMediaComponent,
          MockUrlPipe,
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
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
