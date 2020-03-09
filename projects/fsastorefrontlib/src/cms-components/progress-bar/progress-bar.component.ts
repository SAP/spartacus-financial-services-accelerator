import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'fsa-progress-bar',
  templateUrl: './progress-bar.component.html',
})
export class FSProgressBarComponent implements OnInit {
  constructor() {}

  @Input()
  steps: any;

  ngOnInit() {}
}
