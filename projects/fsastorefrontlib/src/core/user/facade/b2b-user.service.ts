import { Injectable } from '@angular/core';
import { B2BUserRole } from '@spartacus/core';
import { B2BUserService } from '@spartacus/organization/administration/core';
@Injectable({ providedIn: 'root' })
export class FSB2BUserService extends B2BUserService {
  /**
   * Get list of all roles for B2BUser sorted by increasing privileges.
   *
   * If you reconfigure those roles in the backend or extend the list, you should change
   * this implementation accordingly.
   */
  getAllRoles(): B2BUserRole[] {
    return [B2BUserRole.CUSTOMER, B2BUserRole.ADMIN];
  }
}
