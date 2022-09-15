import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { UserComponentsModule } from '@spartacus/organization/administration/components';
import { FSUnitUserCreateModule } from './create/unit-user-create.module';
import { FSUserDetailsModule } from './details/user-details.module';
import { FSUserFormModule } from './form/user-form.module';
import { userCmsConfig } from './user.config';
@NgModule({
  imports: [
    UserComponentsModule,
    FSUserDetailsModule,
    FSUserFormModule,
    FSUnitUserCreateModule,
  ],
  providers: [provideConfig(userCmsConfig)],
})
export class FSUserComponentsModule {}
