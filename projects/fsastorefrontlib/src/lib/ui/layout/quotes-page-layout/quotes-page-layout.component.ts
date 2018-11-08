import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'fsa-quotes-page-layout',
  templateUrl: './quotes-page-layout.component.html',
  styleUrls: ['./quotes-page-layout.component.scss']
})
export class QuotesPageLayoutComponent implements OnInit {
  constructor() {}

  quotes = 'Quotes';

  ngOnInit() {}
}
