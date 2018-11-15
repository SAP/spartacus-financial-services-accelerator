import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BootstrapModule } from 'projects/storefrontlib/src/lib/bootstrap.module';
import { FsaNavigationService } from './fsa-navigation.service';
import { FsaNavigationComponent } from './fsa-navigation.component';

@NgModule({
    imports: [CommonModule, RouterModule, BootstrapModule],
    providers: [FsaNavigationService, FsaNavigationService],
    declarations: [FsaNavigationComponent],
    entryComponents: [FsaNavigationComponent],
    exports: [FsaNavigationComponent]
  })
  export class FsaNavigationModule {}
