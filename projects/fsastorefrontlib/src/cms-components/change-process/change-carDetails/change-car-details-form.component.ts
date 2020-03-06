import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ChangeRequestService } from '../../../core/change-request/facade/change-request.service';

@Component({
  selector: 'fsa-change-car-details-form',
  templateUrl: './change-car-details-form.component.html',
})
export class ChangeCarDetailsFormComponent implements OnInit {
  constructor(
    protected changeRequestService: ChangeRequestService,
    protected fb: FormBuilder
  ) {}

  changeCarDetailsForm: FormGroup = this.fb.group({
    effectiveDate: new FormControl(
      { value: new Date().toISOString().substr(0, 10), disabled: true },
      Validators.required
    ),
    mileage: ['', [Validators.required, Validators.max(100000)]],
  });

  ngOnInit() {}
}
