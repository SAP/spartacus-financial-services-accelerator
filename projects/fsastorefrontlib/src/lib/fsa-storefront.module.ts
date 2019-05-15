import { NgModule, ModuleWithProviders } from '@angular/core';
import { provideConfig, ConfigModule } from '@spartacus/core';


import { MyAccountModule } from './my-account/index';
import { StorefrontModuleConfig, StorefrontModule, PageComponentModule } from '@spartacus/storefront';
import { UiModule } from './ui/index';
import { CmsLibModule } from './cms-lib/cms-lib.module';

@NgModule({
  imports: [
    UiModule,
    PageComponentModule,
    CmsLibModule,
    MyAccountModule,
    StorefrontModule,
    ConfigModule.forRoot(),
    ConfigModule.withConfig({
      layoutSlots: {
        header: {
          md: {
            slots: [
              'SiteLogo',
              'SearchBox',
              'HeaderLinksSlot',
              'MiniCart',
              'NavigationBar'
            ],
          },
          xs: {
            slots: ['PreHeader', 'SiteLogo', 'SearchBox'],
          },
        },
        navigation: {
          xs: {
            slots: ['HeaderLinksSlot', 'NavigationBar'],
          },
        },
      },
      cmsStructure: {
        components: {
          HamburgerMenuComponent: {
            typeCode: 'HamburgerMenuComponent',
            flexType: 'HamburgerMenuComponent',
          },
          LoginComponent: {
            typeCode: 'LoginComponent',
            flexType: 'LoginComponent',
            uid: 'LoginComponent'
          }
        },
        slots: {
          PreHeader: {
            componentIds: ['HamburgerMenuComponent']
          },
          HeaderLinksSlot: {
            componentIds: ['LoginComponent']
          }
        }
      }
    })
  ],
  exports: [
    StorefrontModule,
    MyAccountModule,
    CmsLibModule
  ],
  declarations: []
})
export class FSAStorefrontModule {
  static withConfig(config?: StorefrontModuleConfig): ModuleWithProviders {
    return {
      ngModule: FSAStorefrontModule,
      providers: [provideConfig(config)]
    };
  }
}
