import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ChangeRequestService } from './../../../core/change-request/facade/change-request.service';

@Component({
  selector: 'fsa-change-car-details',
  templateUrl: './change-carDetails.component.html',
})
export class ChangeCarDetailsComponent implements OnInit {
  constructor(
    protected changeRequestService: ChangeRequestService,
    protected fb: FormBuilder
  ) {}

  changeCarDetailsForm: FormGroup = this.fb.group({
    effectiveDate: new FormControl(
      { value: new Date().toISOString().substr(0, 10), disabled: true },
      Validators.required
    ),
    mileage: ['', [Validators.required]],
  });

  ngOnInit() {}
}
