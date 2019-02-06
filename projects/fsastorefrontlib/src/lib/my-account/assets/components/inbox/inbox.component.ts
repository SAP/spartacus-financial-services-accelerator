import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { ProductService } from '@spartacus/core';
import { Store, select } from '@ngrx/store';
import { OccConfig } from '@spartacus/core';
import { CmsProductFeatureComponent } from './../../../../occ-models/cms-component.models';
import * as fromStore from '../../store';

@Component({
  selector: 'fsa-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsProductFeatureComponent>,
    protected productService: ProductService
  ) {}

  component$;
  product$;
  ngOnInit() {
      this.component$ = this.componentData.data$;
      this.component$.subscribe(data => {
          this.product$ = this.productService.get(data.product);
      });
  }
}
