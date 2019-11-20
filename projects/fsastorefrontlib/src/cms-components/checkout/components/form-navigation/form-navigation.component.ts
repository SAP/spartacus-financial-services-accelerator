import { Component, OnInit } from '@angular/core';
import { FormDataService } from '@fsa/dynamicforms';
import { ActivatedRoute, Router } from '@angular/router';
import { FSCheckoutConfigService } from '../../../../core/checkout/services/fs-checkout-config.service';
import { RoutingService, RoutingConfigService } from '@spartacus/core';
import { map, switchMap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'fsa-form-navigation',
  templateUrl: './form-navigation.component.html',
})
export class FormNavigationComponent implements OnInit {
  constructor(
    protected formService: FormDataService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService,
    protected checkoutConfigService: FSCheckoutConfigService,
    protected routingConfigService: RoutingConfigService,
    protected router: Router
  ) {}

  checkoutStepUrlNext: string;

  ngOnInit() {
    this.checkoutStepUrlNext = this.checkoutConfigService.getNextCheckoutStepUrl(
      this.activatedRoute
    );
  }

  next() {
    this.formService.submit();
    this.formService.checkSubmitted().subscribe(submitted => {
      if (submitted) {
        this.activatedRoute.params.subscribe( params => {
          this.routingService.go({
            cxRoute: 'category',
            params: { code: params['formCode'] },
          });
        });
      }
    });
  }
}
