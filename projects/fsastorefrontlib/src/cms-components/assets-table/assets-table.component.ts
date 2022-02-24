import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

/**
 * The Assets Table component currently provides a limited generic table DOM structure. It accepts 4 strings used as headings
 * and one object which can contain either Quotes, Policies or Claims. Based on what asset the user has chosen on user-profile component,
 * that asset is being passed to this component and is displayed accordingly in the table.
 *
 * TO-DO: Create more generic approach with some sort of configuration
 */

@Component({
  selector: 'cx-fs-assets-table',
  templateUrl: './assets-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssetsTableComponent {
  constructor() {}

  @Input() headings: string[];
  @Input() assets: { [key: string]: any }[];
}
