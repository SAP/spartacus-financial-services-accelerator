import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CmsConfig, I18nModule, provideConfig } from '@spartacus/core';
import { GenericLinkModule, IconModule } from '@spartacus/storefront';
import { FSNavigationUIComponent } from './navigation-ui.component';
import { FSNavigationComponent } from './navigation.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        I18nModule,
        IconModule,
        GenericLinkModule,
    ],
    providers: [
        provideConfig(<CmsConfig>{
            cmsComponents: {
                NavigationComponent: {
                    component: FSNavigationComponent,
                },
            },
        }),
    ],
    declarations: [FSNavigationComponent, FSNavigationUIComponent],
    exports: [FSNavigationComponent, FSNavigationUIComponent]
})
export class NavigationModule {}
