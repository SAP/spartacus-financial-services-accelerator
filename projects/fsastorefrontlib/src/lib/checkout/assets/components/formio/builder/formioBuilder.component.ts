import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'fsa-formiobuilder-component',
  templateUrl: './formioBuilder.component.html'
})
export class FormioBuilderComponent implements OnInit {
  @ViewChild('json', {'static': false}) jsonElement?: ElementRef;
  public form: Object = {
    components: []
  };
  onChange(event) {
    console.log(event);
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 4)));
  }

  ngOnInit() {

  }
}
