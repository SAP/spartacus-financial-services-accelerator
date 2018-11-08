import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fsa-policies-page-layout',
  templateUrl: './policies-page-layout.component.html',
  styleUrls: ['./policies-page-layout.component.scss']
})
export class PoliciesPageLayoutComponent implements OnInit {
  constructor() {}

  policies = 'Policies';

  ngOnInit() {}
}
