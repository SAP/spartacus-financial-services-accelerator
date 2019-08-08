import { Component, ViewChild, AfterViewInit, OnInit, Input } from '@angular/core';
import { Validators } from '@angular/forms';

import { FormDefinition } from './dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';
import { CustomFormValidators } from 'projects/fsastorefrontlib/src/lib/cms-lib/util/validators/custom-form-validators';

@Component({
  selector: 'fsa-forms',
  templateUrl: './forms.component.html'
})
export class FormsComponent implements AfterViewInit, OnInit {
  @ViewChild(DynamicFormComponent, {static: false}) form: DynamicFormComponent;
  @Input()
  formCategoryCode: string;
  categoryConfig: FormDefinition;

  config: FormDefinition[] = [{
    categoryCode: "insurances_auto",
    formGroups: [
      {
        groupName: 'General',
        priceAttributes: [
          {
            type: 'title',
            label: 'General'
          },
          {
            type: 'datepicker',
            label: 'Coverage Start Date',
            name: 'coverageStartDate',
            validation: [Validators.required, CustomFormValidators.comapreToCurrentDate('shouldBeGrater')],
          },
          {
            type: 'select',
            options: ['Monthly', 'Annually'],
            label: 'Payent Frequency',
            name: 'paymentFrequency',
          }
        ]
      },
    {
      groupName: 'Vehicle',
        priceAttributes: [
          {
            type: 'title',
            label: 'Vehicle'
          },
          {
            type: 'select',
            options: ['BMW'],
            label: 'Vehicle Make',
            name: 'vehicleMake'
          },
          {
            type: 'select',
            options: ['328'],
            label: 'Vehicle Model',
            name: 'vehicleModel',
            validation: [Validators.required],
          },
          {
            type: 'select',
            options: ['BMW3.2SUPER'],
            label: 'Vehicle Type',
            name: 'vehicleType',
            validation: [Validators.required],
          },
          {
            type: 'select',
            options: ['2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011', '2010'],
            label: 'Vehicle Year',
            name: 'vehicleYear',
            validation: [Validators.required],
          },
          {
            type: 'input',
            label: 'Annual Mileage',
            name: 'vehicleAnnualMileage',
            validation: [Validators.required],
          },
          {
            type: 'input',
            label: 'Vehicle Value',
            name: 'vehicleValue',
            validation: [Validators.required],
          },
          {
            type: 'select',
            options: ['Personal', 'Business'],
            label: 'Vehicle Usage',
            name: 'vehicleUsage',
            validation: [Validators.required],
          },
          {
            type: 'datepicker',
            label: 'Vehicle Purchase Date',
            name: 'vehiclePurchaseDate',
            validation: [Validators.required],
          },
          {
            type: 'input',
            label: 'Vehicle Owner Postal Code',
            name: 'vehicleOwnerPostalCode',
            validation: [Validators.required],
          },
        ]
      },
      {
        groupName: 'Main Driver',
        priceAttributes: [
          {
            type: 'title',
            label: 'Main Driver'
          },
          {
            type: 'datepicker',
            label: 'Driver Date of Birth',
            name: 'driverDob',
            validation: [ CustomFormValidators.dateOfBirthValidator(18)]
          },
          {
            type: 'select',
            label: 'Driver Gender',
            name: 'driverGender',
            options: ['Male', 'Female', 'wtf']
          },
          {
            type: 'select',
            label: 'Driver Marital Status',
            name: 'driverMaritalStatus',
            options: ['Single', 'Married', 'Widowed']
          },
          {
            type: 'select',
            label: 'Driver`s Category',
            name: 'driverCategory',
            options: ['Main'],
            disabled: true,
            placeholder: 'Main'
          },
          {
            type: 'datepicker',
            label: 'Driver Licence Date',
            name: 'driverLicenceDate',
          },
          {
            label: 'Submit',
            name: 'submit',
            type: 'button'
          }
        ]
      },
    ]
  },{
  categoryCode: "insurances_travel",
  formGroups: [
    {
      groupName: 'trip',
      priceAttributes: [
        {
          type: 'select',
          label: 'Destination',
          name: 'tripDestination',
          options: ['Europe', 'UK']
        },
        {
          type: 'datepicker',
          label: 'Start Date',
          name: 'tripStartDate',
          validation: [Validators.required, CustomFormValidators.comapreToCurrentDate('shouldBeGrater')],
        },
        {
          type: 'datepicker',
          label: 'End Date',
          name: 'tripEndDate',
          validation: [Validators.required, CustomFormValidators.comapreToCurrentDate('shouldBeGrater')],
        },
        {
          type: 'input',
          label: 'Trip Cost',
          name: 'costOfTrip'
        },
        {
          type: 'input',
          label: 'Age of Traveller',
          name: 'tripDetailsTravellerAges'
        }
      ]
    }
  ]}
];

  ngOnInit() {
    this.categoryConfig = this.config.filter(item=> item.categoryCode == this.formCategoryCode)[0];
  }

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
      }
    });
  }

  submit(value: {[name: string]: any}) {
    console.log(value);
  }
}
