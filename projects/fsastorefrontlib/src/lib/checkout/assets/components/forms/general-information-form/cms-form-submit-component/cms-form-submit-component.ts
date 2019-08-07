import { Component } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CMSFormSubmitComponent } from 'projects/fsastorefrontlib/src/lib/occ-models';

@Component({
  selector: 'cms-form-submit-component',
  templateUrl: './cms-form-submit-component.html'
})
export class CmsFormSubmitComponent{



  constructor(
    protected componentData: CmsComponentData<CMSFormSubmitComponent>,
  ) { 
  }

  ngOnInit()
  {
      console.log("blal")
    this.componentData.data$.subscribe(data => console.log(data));
  }

}
