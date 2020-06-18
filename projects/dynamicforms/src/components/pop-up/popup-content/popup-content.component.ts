import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'cx-popup-content',
  templateUrl: './popup-content.component.html',
})
export class PopupContentComponent implements OnInit {
  constructor(
    public activeModal: NgbActiveModal,
    protected languageService: LanguageService
  ) {}
  errorMessage: string;
  errorMsgObject: any;
  private subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(
      this.languageService
        .getActive()
        .pipe(
          map(lang => {
            if (this.errorMsgObject) {
              this.errorMessage = this.errorMsgObject[lang]
                ? this.errorMsgObject[lang]
                : this.errorMsgObject.default;
            }
          })
        )
        .subscribe()
    );
  }
}
