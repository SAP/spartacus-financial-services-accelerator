import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';

@Component({
  selector: 'fsa-change-coverage',
  templateUrl: './change-coverage.component.html',
})
export class ChangeCoverageComponent implements OnInit {
  constructor(protected changeRequestService: ChangeRequestService) {}

  changeRequest$: Observable<any>;

  ngOnInit() {
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
  }
}
