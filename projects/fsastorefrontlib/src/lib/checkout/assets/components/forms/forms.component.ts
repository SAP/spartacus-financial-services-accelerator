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
  private productPriceDescriptors: Array<ObjectLiteral>

   ngOnInit() {
   }
   onClickSubmit(formData) {
    this.productPriceDescriptors = formData.map(item => {
      console.log(item);
    })
   }
}
