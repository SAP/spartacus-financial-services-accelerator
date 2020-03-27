import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { genericIcons } from '../../assets/icons/generic-icons';

@Component({
  selector: 'cx-fs-not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  constructor(protected domSanitizer: DomSanitizer) {}

  getImagelink() {
    return this.domSanitizer.bypassSecurityTrustUrl(genericIcons.notFoundIcon);
  }
}
