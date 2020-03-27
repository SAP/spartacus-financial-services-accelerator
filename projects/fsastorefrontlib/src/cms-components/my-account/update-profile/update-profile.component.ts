import { Component } from '@angular/core';
import { UpdateProfileComponent } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { FSUser } from '../../../occ/occ-models';

@Component({
  templateUrl: './update-profile.component.html',
})
export class FSUpdateProfileComponent extends UpdateProfileComponent {
  user$: Observable<FSUser>;
}
