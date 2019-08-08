import { Component } from '@angular/core';
import { UpdateProfileComponent } from '@spartacus/storefront';
import { FSUser } from 'projects/fsastorefrontlib/src/lib/occ-models';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './fs-update-profile.component.html'
})
export class FSUpdateProfileComponent extends UpdateProfileComponent {
  user$: Observable<FSUser>;
}
