import { Component, OnInit } from '@angular/core';
import { ConsentConnector } from '../../core/my-account/connectors/consent.connector';

@Component({
  selector: 'cx-fs-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  constructor(private consentConnector: ConsentConnector) {}

  ngOnInit(): void {
    this.consentConnector
      .getOBOCustomerList('current')
      .subscribe(data => console.log(data));
  }
}
