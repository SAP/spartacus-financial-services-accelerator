import { Component, OnInit } from '@angular/core';
import { CurrentProductService } from '@spartacus/storefront';
import { map } from 'rxjs/operators';
import { FormDataService, FormDefinition } from '@fsa/dynamicforms';

@Component({
  selector: 'cx-fs-product-configuration-form',
  templateUrl: './product-configuration-form.component.html',
})
export class ProductConfigurationFormComponent implements OnInit {
  constructor(
    protected currentProductService: CurrentProductService,
    protected formDataService: FormDataService
  ) {}

  product$: any;
  formDefinition$: any;
  formConfig: any;
  applicationId: string;
  formDefintionId: string;

  ngOnInit() {
    this.formDefinition$ = this.formDataService.getFormDefinition().pipe(
      map(definition => {
        if (definition.content) {
          this.formConfig = <FormDefinition>JSON.parse(definition.content);
        }
        return definition;
      })
    );

    this.product$ = this.currentProductService.getProduct().pipe(
      map(product => {
        if (product && product.categories) {
          product.categories.forEach(category => {
            const cat = <any>category;
            if (cat.YFormConfiguratorSettings) {
              this.applicationId = 'insurance';
              this.formDefintionId =
                cat.YFormConfiguratorSettings.configurationFormId;
              this.formDataService.loadFormDefinition(
                this.applicationId,
                this.formDefintionId
              );
            }
          });
        }
        return product;
      })
    );
  }
}
