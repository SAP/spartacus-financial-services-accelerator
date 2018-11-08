import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductCarouselComponent } from './product-carousel.component';
import { MediaModule } from '../../ui/components/media/media.module';
import { BootstrapModule } from '../../bootstrap.module';

@NgModule({
  imports: [CommonModule, RouterModule, MediaModule, BootstrapModule],
  declarations: [ProductCarouselComponent],
  entryComponents: [ProductCarouselComponent],
  exports: [ProductCarouselComponent]
})
export class ProductCarouselModule {}
