import { Injectable } from '@angular/core';
import { FieldConfig } from '@spartacus/dynamicforms';
import { CategoryService } from '../../../core';

import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

export const CATEGORY_CODE = 'categoryCode';

@Injectable()
export class DynamicFormsCategoryService {
  constructor(protected categoryService: CategoryService) {}

  subscription = new Subscription();

  configureApiValueForCategory(config: FieldConfig) {
    if (!config.apiValue.url.includes(CATEGORY_CODE)) {
      this.subscription.add(
        this.categoryService
          .getActiveCategory()
          .pipe(
            map(activeCategory => {
              if (activeCategory !== '') {
                config.apiValue.url += `?${CATEGORY_CODE}=${activeCategory}`;
              }
            })
          )
          .subscribe()
      );
    }
  }
}
