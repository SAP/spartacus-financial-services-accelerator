import { Component, OnInit } from '@angular/core';
import { ActiveCartService } from '@spartacus/core';
import { map } from 'rxjs/operators';
import { FSProduct, FSCategory } from './../../../occ/occ-models/occ.models';
import { Observable } from 'rxjs';
import { FormDataService, FormDefinition } from '@fsa/dynamicforms';

@Component({
  selector: 'cx-fs-personal-details',
  templateUrl: './personal-details.component.html',
})
export class PersonalDetailsComponent implements OnInit {
  constructor(
    protected cartService: ActiveCartService,
    protected formSevice: FormDataService
  ) {}

  formDefinition$: Observable<any>;
  formConfig;

  ngOnInit() {
    this.formDefinition$ = this.formSevice.getFormDefinition().pipe(
      map(definition => {
        if (definition.content) {
          this.formConfig = <FormDefinition>JSON.parse(definition.content);
        }
        return definition;
      })
    );

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
              if (productCategory.yformDefinitions) {
                const formDefiniton = productCategory.yformDefinitions[0];
                this.formSevice.loadFormDefinition(
                  formDefiniton.applicationId,
                  formDefiniton.formId
                );
              }
            });
          }
        })
      )
      .subscribe();
  }
}
