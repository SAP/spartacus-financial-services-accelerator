import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nModule, ConfigModule, CmsConfig } from '@spartacus/core';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

@NgModule({
    imports: [
        CommonModule,
        I18nModule,
        RouterModule,
        ConfigModule.withConfig(<CmsConfig>{
            cmsComponents: {
                NotFoundFlex: {
                    component: NotFoundComponent,
                },
            },
        }),
    ],
    declarations: [NotFoundComponent],
    exports: [NotFoundComponent]
})
export class NotFoundModule {}
