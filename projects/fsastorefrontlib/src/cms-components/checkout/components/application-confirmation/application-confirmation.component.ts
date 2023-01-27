import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import {
  GlobalMessageService,
  GlobalMessageType,
  RoutingService,
} from '@spartacus/core';
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
    protected routingService: RoutingService,
    protected globalMessageService: GlobalMessageService
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
            if (this.quoteId && this.productName) {
              this.quotePrice = localStorage.getItem('bankingApplicationPrice');
              this.globalMessageService.add(
                { key: 'applicationConfirmation.documentsMessage' },
                GlobalMessageType.MSG_TYPE_INFO
              );
            }
          })
        )
        .subscribe()
    );
    localStorage.removeItem('applicationConfirmation');
    if (!this.quotePrice) {
      this.routingService.go('/');
    }
  }

  navigateQuoteDetails() {
    this.routingService.go({
      cxRoute: 'quoteDetails',
      params: { quoteId: this.quoteId },
    });
  }

  navigateInbox() {
    this.routingService.go({
      cxRoute: 'inbox',
    });
  }
}
