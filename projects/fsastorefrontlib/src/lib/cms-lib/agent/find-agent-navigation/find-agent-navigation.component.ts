import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'fsa-find-agent-navigation',
  templateUrl: './find-agent-navigation.component.html'
})
export class FindAgentNavigationComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  disableByMatchingUrl(urlPartToMatch) {
    return (this.router.url.indexOf(urlPartToMatch) !== -1 ? true : false);
  }
}
