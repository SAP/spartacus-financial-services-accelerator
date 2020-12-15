import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  FormCMSComponent,
  FormDataService,
  FormDataStorageService,
} from '@fsa/dynamicforms';
import { CmsComponentConnector } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsFormSubmitComponent } from '../../../occ/occ-models';

@Component({
  selector: 'cx-fs-cms-form-submit',
  templateUrl: './cms-form-submit.component.html',
})
export class CMSFormSubmitComponent extends FormCMSComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsFormSubmitComponent>,
    protected activatedRoute: ActivatedRoute,
    protected cmsComponentConnector: CmsComponentConnector,
    protected formDataService: FormDataService,
    protected formDataStorageService: FormDataStorageService
  ) {
    super(componentData, formDataService, formDataStorageService);
  }
}
