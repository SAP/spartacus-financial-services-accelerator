import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fsa-claims-page-layout',
  templateUrl: './claims-page-layout.component.html',
  styleUrls: ['./claims-page-layout.component.scss']
})
export class ClaimsPageLayoutComponent implements OnInit {
  constructor() {}

  claims = 'Claims';

  ngOnInit() {}
}
