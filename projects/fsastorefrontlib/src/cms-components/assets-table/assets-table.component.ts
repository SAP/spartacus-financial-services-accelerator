import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'cx-fs-assets-table',
  templateUrl: './assets-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsTableComponent implements OnInit {
  constructor() {}

  @Input() headings: string[];
  @Input() assets: { [key: string]: any }[];

  ngOnInit(): void {}
}
