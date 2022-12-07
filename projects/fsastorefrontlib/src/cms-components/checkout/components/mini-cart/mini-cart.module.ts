import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { I18nModule } from '@spartacus/core';
import { MiniCartComponent } from './mini-cart.component';

@NgModule({
    imports: [CommonModule, I18nModule, RouterModule],
    declarations: [MiniCartComponent],
    exports: [MiniCartComponent],
    providers: []
})
export class MiniCartModule {}
