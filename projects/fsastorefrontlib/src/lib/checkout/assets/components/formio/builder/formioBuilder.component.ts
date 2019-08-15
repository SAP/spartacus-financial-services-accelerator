import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import formDefinition from '../forms.json';

@Component({
  selector: 'fsa-formiobuilder-component',
  templateUrl: './formioBuilder.component.html'
})
export class FormioBuilderComponent implements OnInit {
  @ViewChild('json', {'static': false}) jsonElement?: ElementRef;
  public form = formDefinition;
  onChange(event) {
    this.jsonElement.nativeElement.innerHTML = '';
    this.jsonElement.nativeElement.appendChild(document.createTextNode(JSON.stringify(event.form, null, 2)));
  }
  saveForm(form) {
  }
  ngOnInit() {
    console.log(this.form);
  }
}
