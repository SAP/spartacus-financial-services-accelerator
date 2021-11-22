import { Component, OnInit } from '@angular/core';
import { ConsentConnector } from '../../core/my-account/connectors/consent.connector';

@Component({
  selector: 'cx-fs-my-dashboard',
  templateUrl: './my-dashboard.component.html',
})
export class MyDashboardComponent implements OnInit {
  constructor(private consentConnector: ConsentConnector) {}

  ngOnInit(): void {
    this.consentConnector
      .getOBOCustomerList('current')
      .subscribe(data => console.log(data));
  }
}
