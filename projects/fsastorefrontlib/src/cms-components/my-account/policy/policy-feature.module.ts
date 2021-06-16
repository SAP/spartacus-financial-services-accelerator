import { NgModule } from '@angular/core';
import { CmsConfig, provideConfig } from '@spartacus/core';
import { MY_ACCOUNT_FEATURE } from '../../../core/my-account/store/my-account-state';

@NgModule({
  declarations: [],

  providers: [
    provideConfig(<CmsConfig>{
      featureModules: {
        [MY_ACCOUNT_FEATURE]: {
          module: () =>
            import('./policies-chart/policies-chart.module').then(
              m => m.PoliciesChartModule
            ),
        },
      },
    }),
    // provideConfig(<CmsConfig>{
    //   featureModules: {
    //     [USER_PROFILE_FEATURE]: {
    //       module: () =>
    //         import('@spartacus/user/profile').then((m) => m.UserProfileModule),
    //     },
    //   },
    // }),
    // provideConfig(<I18nConfig>{
    //   i18n: {
    //     resources: userProfileTranslations,
    //     chunks: userProfileTranslationChunksConfig,
    //     fallbackLang: 'en',
    //   },
    // }),
  ],
})
export class PolicyFeatureModule {}
