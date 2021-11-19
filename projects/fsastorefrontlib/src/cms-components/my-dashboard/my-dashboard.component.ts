import { Component, OnInit } from '@angular/core';
import { MyDashboardConnector } from '../../core/my-dashboard/connectors/my-dashboard.connector';

@Component({
  selector: 'cx-fs-my-dashboard',
  templateUrl: './my-dashboard.component.html',
})
export class MyDashboardComponent implements OnInit {
  constructor(private myDashBoardConnector: MyDashboardConnector) {}

  ngOnInit(): void {
    this.myDashBoardConnector
      .getOBOConsents('current')
      .subscribe(data => console.log(data));
  }
}
