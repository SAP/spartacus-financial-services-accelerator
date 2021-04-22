import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { UserComponentsModule } from '@spartacus/organization/administration/components';
import { FSUserDetailsModule } from './details/user-details.module';
import { userCmsConfig } from './user.config';
@NgModule({
  imports: [UserComponentsModule, FSUserDetailsModule],
  providers: [provideDefaultConfig(userCmsConfig)],
})
export class FSUserComponentsModule {}
