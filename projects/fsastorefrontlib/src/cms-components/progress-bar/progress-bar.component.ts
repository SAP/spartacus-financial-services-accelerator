import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRequestNavigationService } from '../../core/user-request/facade/user-request-navigation.service';

@Component({
  selector: 'cx-fs-progress-bar',
  templateUrl: './progress-bar.component.html',
})
export class ProgressBarComponent implements OnInit {
  @Input()
  steps: any;
  activeStepIndex: string;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected userRequestNavigationService: UserRequestNavigationService
  ) {}
  ngOnInit() {
    this.activeStepIndex = this.userRequestNavigationService.getActiveStep(
      this.steps,
      this.activatedRoute.routeConfig.path
    ).sequenceNumber;
  }
}
