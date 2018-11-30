import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AbstractStoreItemComponent } from '../abstract-store-item/abstract-store-item.component';
import { StoreDataService, StoreFinderService } from '../../services/index';

import * as fromStore from '../../store';

@Component({
  selector: 'cx-store-finder-store-description',
  templateUrl: './store-finder-store-description.component.html',
  styleUrls: ['./store-finder-store-description.component.scss']
})
export class StoreFinderStoreDescriptionComponent
  extends AbstractStoreItemComponent
  implements OnInit, OnDestroy {
  location: any;
  ngUnsubscribe: Subscription;

  constructor(
    private store: Store<fromStore.StoresState>,
    protected storeDataService: StoreDataService,
    protected storeFinderService: StoreFinderService,
    private route: ActivatedRoute
  ) {
    super(storeDataService);
  }

  ngOnInit() {
    this.requestStoresData();
    this.ngUnsubscribe = this.store
      .pipe(select(fromStore.getFindStoresEntities))
      .subscribe(locations => {
        const stores = locations.pointOfServices;
        if (stores) {
          this.location = stores.filter(
            (store: any) => store.name === this.route.snapshot.params.store
          )[0];
        }
      });
  }

  requestStoresData() {
    const { region, country } = this.route.snapshot.params;
    if (!country) {
      return;
    }
    if (region) {
      this.storeFinderService.viewAllStoresForRegion(country, region);
      return;
    }
    this.storeFinderService.viewAllStoresForCountry(country);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.unsubscribe();
  }
}
