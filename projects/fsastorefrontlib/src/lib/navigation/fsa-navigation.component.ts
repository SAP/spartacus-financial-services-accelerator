import { Component, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FsaNavigationService } from './fsa-navigation.service';
import { CmsService } from 'projects/storefrontlib/src/lib/cms/facade/cms.service';
import { NavigationComponent } from '@spartacus/storefront';
import { Store } from '@ngrx/store';
import * as fromStore from '@spartacus/storefront/lib/cms/store';

@Component({
    selector: 'fsa-navigation',
    templateUrl: './fsa-navigation.component.html',
    styleUrls: ['./fsa-navigation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FsaNavigationComponent extends NavigationComponent {

    constructor(
        protected cmsService: CmsService,
        protected cd: ChangeDetectorRef,
        protected fsaNavigationService: FsaNavigationService,
        protected store: Store<fromStore.CmsState>
    ) {
        super(cmsService, cd, fsaNavigationService, store);
    }

}
