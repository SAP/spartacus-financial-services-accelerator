import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'fsa-comparison-table',
  templateUrl: './comparison-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComparisonTableComponent implements OnInit {
  constructor(
  ) {}

  component$;
  ngOnInit() {
  }
}
