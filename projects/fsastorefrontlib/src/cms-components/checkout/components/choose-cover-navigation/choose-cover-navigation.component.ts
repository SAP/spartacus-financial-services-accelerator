import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormDataService, YFormData } from '@fsa/dynamicforms';
import { RoutingService } from '@spartacus/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormComponent } from '@fsa/dynamicforms';

@Component({
  selector: 'cx-fs-choose-cover-navigation',
  templateUrl: './choose-cover-navigation.component.html',
})
export class ChooseCoverNavigationComponent implements OnInit, OnDestroy {
  constructor(
    protected formService: FormDataService,
    protected activatedRoute: ActivatedRoute,
    protected routingService: RoutingService
  ) {}

  @ViewChild(FormComponent,  { static: false })
  private formComponent: FormComponent;

  subscription = new Subscription();

  categoryCode: string;

  ngOnInit() {
    console.log(this.formComponent);
    this.subscription.add(
      this.activatedRoute.params
        .pipe(
          map(params => {
            this.categoryCode = params['formCode'];
          })
        )
        .subscribe()
    );
  }

  navigateNext() {
    this.formComponent.submit(null);
    const formDataId = this.formService.getFormDataIdByCategory(
      this.categoryCode
    );
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
                params: { code: this.categoryCode },
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
