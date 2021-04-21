import { NgModule } from '@angular/core';
import {
  provideDefaultConfig,
  provideDefaultConfigFactory,
} from '@spartacus/core';
import {
  ListModule,
  UserApproverListModule,
  UserChangePasswordFormModule,
  UserFormModule,
  UserPermissionListModule,
  UserUserGroupsModule,
} from '@spartacus/organization/administration/components';
import { FSUserDetailsModule } from './details/user-details.module';
import {
  userCmsConfig,
  userRoutingConfig,
  userTableConfigFactory,
} from './user.config';
@NgModule({
  imports: [
    ListModule,
    UserChangePasswordFormModule,
    UserFormModule,
    UserPermissionListModule,
    UserUserGroupsModule,
    UserApproverListModule,
    FSUserDetailsModule,
  ],
  providers: [
    provideDefaultConfig(userRoutingConfig),
    provideDefaultConfig(userCmsConfig),
    provideDefaultConfigFactory(userTableConfigFactory),
  ],
  exports: [FSUserDetailsModule],
})
export class FSUserComponentsModule {}
