import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

/**
 * The Asstes Table component currently provides a somewhat generic table DOM structure. It accepts 4 strings used as headings
 * and one object which can contain either Quotes, Policies or Claims. Based on what asset the user has chosen on user-profile component,
 * that asset is being passed to this component and is displayed accordingly.
 *
 * TO-DO: Create more generic approach with some sort of configuration
 */

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
