import { Component } from '@angular/core';
export interface ObjectLiteral {
  [key: string]: any;
}
@Component({
  selector: 'fsa-travel-form',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent {
  
  constructor() { }
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
    console.log(this.test);
   }
}
