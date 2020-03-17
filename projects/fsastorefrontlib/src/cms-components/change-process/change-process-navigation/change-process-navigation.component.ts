import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';

@Component({
  selector: 'fsa-change-process-navigation',
  templateUrl: './change-process-navigation.component.html',
})
export class ChangeProcessNavigationComponent implements OnInit {
  constructor(protected changeRequestService: ChangeRequestService) { }

  changeRequest$: Observable<any>;

  ngOnInit() {
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
  }

  cancelRequest(requestId: string) {
    this.changeRequestService.cancelChangeRequest(requestId);
  }
}
