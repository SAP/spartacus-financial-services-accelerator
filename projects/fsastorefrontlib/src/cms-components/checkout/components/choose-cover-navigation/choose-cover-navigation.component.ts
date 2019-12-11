import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService } from '@fsa/dynamicforms';
import { RoutingService } from '@spartacus/core';
import { of, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { YFormData } from 'dynamicforms/src/core';

@Component({
  selector: 'fsa-choose-cover-navigation',
  templateUrl: './choose-cover-navigation.component.html',
})
export class ChooseCoverNavigationComponent implements OnInit {
  constructor(
    protected formService: FormDataService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService
  ) {}

  subscription = new Subscription();

  categoryCode: string;

  ngOnInit() {
    this.subscription.add(
      this.activatedRoute.params.pipe(
        map(params => {
            this.categoryCode = params['formCode'];
        })
      ).subscribe()
    );
  }

  navigateNext() {
    const formDataId = this.formService.getFormDataIdByCategory(this.categoryCode);
    const formData: YFormData = {};
    if (formDataId) {
      formData.id = formDataId;
    }
    this.formService.submit(formData);
    this.subscription.add(
      this.formService
        .getSubmittedForm()
        .pipe(
          map(data => {
            if (data && data.content) {
              this.routingService.go({
                cxRoute: 'category',
                params: {code: this.categoryCode}
              });
            }
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
