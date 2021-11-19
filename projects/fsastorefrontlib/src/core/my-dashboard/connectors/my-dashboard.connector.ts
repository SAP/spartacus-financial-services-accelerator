import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MyDashboardAdapter } from './my-ashboard.adapter';

@Injectable({
  providedIn: 'root',
})
export class MyDashboardConnector {
  constructor(protected myDashboardAdapter: MyDashboardAdapter) {}

  getOBOConsents(userId: string): Observable<any> {
    console.log(userId, 'dsfdsfds');
    return this.myDashboardAdapter.getOBOConsents(userId);
  }

  getOBOCustomerList(userId: string): Observable<any> {
    return this.myDashboardAdapter.getOBOCustomerList(userId);
  }
}
