import { Component } from '@angular/core';
import { OccFSProductService } from 'projects/fsastorefrontlib/src/lib/occ/product/fs-product-service';
export interface ObjectLiteral {
  [key: string]: any;
}
@Component({
  selector: 'fsa-travel-form',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  
  constructor(
    protected productService: OccFSProductService,
  ) { }
  formDataArray: any = [];
  test = {
    "productPriceDescriptors": this.formDataArray
   };
   onClickSubmit(formData) {
    Object.entries(formData).forEach(entry => {
      let key = entry[0];
      let value = entry[1];
      let obj = {
        "key" : key,
        "value" : value
      }
      this.formDataArray.push(obj);
    });
    this.productService.setformObj(this.test);
   }
}
