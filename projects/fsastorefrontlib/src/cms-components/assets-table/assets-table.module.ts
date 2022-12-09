import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule, UrlModule } from '@spartacus/core';
import { IconModule, SpinnerModule } from '@spartacus/storefront';
import { AssetTdComponent } from './asset-td/asset-td.component';
import { AssetsTableComponent } from './assets-table.component';
import { ResolveAssetValuePipe } from './resolve-asset-value.pipe';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    SpinnerModule,
    UrlModule,
    RouterModule,
    IconModule,
  ],
  declarations: [AssetsTableComponent, AssetTdComponent, ResolveAssetValuePipe],
  exports: [AssetsTableComponent, AssetTdComponent, ResolveAssetValuePipe],
})
export class AssetsTableModule {}
