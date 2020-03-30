import { Component, Input } from '@angular/core';

@Component({
  selector: 'cx-fs-progress-bar',
  templateUrl: './progress-bar.component.html',
})
export class ProgressBarComponent {
  @Input()
  steps: any;
}
