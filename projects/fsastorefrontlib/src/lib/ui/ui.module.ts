import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesModule } from './pages/pages.module';
import { ConfigModule } from '@spartacus/core';


@NgModule({
    imports: [
        CommonModule,
        PagesModule,
        ConfigModule.withConfig({
            routesConfig: {
              translations: {
                default: {
                  'comparisonTable': { paths: ['comparisonTable/:categoryCode'] },
                  'add-options': { paths: ['add-options'] }
                }
              }
            },
            layoutSlots: {
              InsuranceLandingPageTemplate: {
                slots: [
                  'Section1',
                  'Section2A',
                  'Section2B',
                  'Section2C',
                  'Section3',
                  'Section4',
                  'Section5'
                ]
              },
              FSCategoryPageTemplate: {
                slots: [
                  'Section1',
                  'Section2A',
                  'Section2B',
                  'Section3',
                  'Section4'
                ]
              },
              MultiTabsCategoryPageTemplate: {
                slots: [
                  'Section1',
                  'Section2',
                ]
              }
            }
            }
          )
        ],
    exports: [PagesModule]
})
export class UiModule { }
