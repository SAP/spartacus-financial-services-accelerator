import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig, I18nModule } from '@spartacus/core';
import { RouterModule, Routes } from '@angular/router';
import {
  CarouselModule,
  CmsPageGuard,
  FacetModule,
  IconModule,
  KeyboardFocusModule,
  MediaModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import { QuestionnaireCarouselComponent } from './questionnaire-carousel.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard],
    data: {
      cxRoute: 'questionnaire',
      pageLabel: 'questionnaire',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    MediaModule,
    CarouselModule,
    FacetModule,
    KeyboardFocusModule,
    IconModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        QuestionnaireCarouselComponent: {
          component: QuestionnaireCarouselComponent,
        },
      },
    }),
  ],
  declarations: [QuestionnaireCarouselComponent],
  exports: [QuestionnaireCarouselComponent],
})
export class QuestionnaireCarouselModule {}
