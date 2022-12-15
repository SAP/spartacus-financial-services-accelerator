import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { RoutingService } from '@spartacus/core';
import { genericIcons } from '../../../../assets/icons/generic-icons';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-fs-application-confirmation',
  templateUrl: 'application-confirmation.component.html',
})
export class ApplicationConfirmationComponent implements OnInit {
  constructor(
    protected domSanitizer: DomSanitizer,
    protected routingService: RoutingService
  ) {}

  imageLink = this.domSanitizer.bypassSecurityTrustUrl(
    genericIcons.applicationConfirmationImage
  );

  quoteId: string;
  productName: string;
  quotePrice: string;
  subscription = new Subscription();

  ngOnInit(): void {
    this.subscription.add(
      this.routingService
        .getRouterState()
        .pipe(
          map(routingData => {
            this.quoteId = routingData.state.params.quoteId;
            this.productName = routingData.state.params.productName;
            this.quotePrice = routingData.state.params.quotePrice;
          })
        )
        .subscribe()
    );

    if (!(this.quoteId && this.productName && this.quotePrice)) {
      this.routingService.go('/');
    }
  }
}
