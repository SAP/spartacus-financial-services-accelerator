import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';

@Component({
  selector: 'cx-fs-change-process-progress-bar',
  templateUrl: './change-process-progress-bar.component.html',
})
export class ChangeProcessProgressBarComponent implements OnInit {
  constructor(protected changeRequestService: ChangeRequestService) {}

  changeRequest$: Observable<any>;

  ngOnInit() {
    this.changeRequest$ = this.changeRequestService.getChangeRequest();
  }
}
