import { NgModule } from '@angular/core';
import { I18nModule } from '@spartacus/core';
import { SyncPilotDialogComponent } from './sync-pilot-dialog.component';
import { SpinnerModule } from '@spartacus/storefront';

@NgModule({
    imports: [I18nModule, SpinnerModule],
    declarations: [SyncPilotDialogComponent],
    exports: [SyncPilotDialogComponent]
})
export class SyncPilotDialogModule {}
