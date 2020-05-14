import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActiveCartService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { FSProduct, FSCategory } from './../../../occ/occ-models/occ.models';
import { Observable, Subscription } from 'rxjs';
import { FormDataService, FormDefinition } from '@fsa/dynamicforms';

@Component({
  selector: 'cx-fs-personal-details',
  templateUrl: './personal-details.component.html',
})
export class PersonalDetailsComponent implements OnInit, OnDestroy {
  constructor(
    protected cartService: ActiveCartService,
    protected formSevice: FormDataService
  ) {}

  formDefinition$: Observable<any> = null;
  formConfig;
  configuratorType = 'PERSONAL_DETAILS_FORM';

  subscription = new Subscription();

  ngOnInit() {
    this.formDefinition$ = this.formSevice.getFormDefinition().pipe(
      map(definition => {
        if (definition.content) {
          this.formConfig = <FormDefinition>JSON.parse(definition.content);
        }
        return definition;
      })
    );

    this.subscription.add(
      this.cartService
      .getActive()
      .pipe(
        map(cart => {
          if (cart.deliveryOrderGroups) {
            const mainProduct = <FSProduct>(
              cart.deliveryOrderGroups[0].entries[0].product
            );
            mainProduct.categories.forEach(category => {
              const productCategory = <FSCategory>category;
              if (
                productCategory.yformConfiguratorSettings &&
                productCategory.yformConfiguratorSettings.configuratorType ===
                  this.configuratorType
              ) {
                this.formSevice.loadFormDefinition(
                  productCategory.yformConfiguratorSettings.configurationApplicationId,
                  productCategory.yformConfiguratorSettings
                    .configurationFormId
                );
              }
            });
          }
        })
      )
      .subscribe()
    );
  }


  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
