import { Component, Input } from '@angular/core';

@Component({
  selector: 'fsa-progress-bar',
  templateUrl: './progress-bar.component.html',
})
export class FSProgressBarComponent {
  @Input()
  steps: any;
}
