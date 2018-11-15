import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FsaNavigationComponent } from '../navigation/fsa-navigation.component';

@Component({
  selector: 'fsa-footer-navigation',
  templateUrl: './fsa-footer-navigation.component.html',
  styleUrls: ['./fsa-footer-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsaFooterNavigationComponent extends FsaNavigationComponent {}
