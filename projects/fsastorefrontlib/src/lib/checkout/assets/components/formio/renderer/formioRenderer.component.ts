import { Component, OnInit } from '@angular/core';
import formDefinition from '../forms.json';

@Component({
  selector: 'fsa-formio-render-component',
  templateUrl: './formioRenderer.component.html'
})
export class FormioRendererComponent implements OnInit {
  public form = formDefinition;

  ngOnInit() {
  }
}
