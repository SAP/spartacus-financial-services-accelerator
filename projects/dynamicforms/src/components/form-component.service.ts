import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FormComponentService {
  constructor() {}

  isPopulatedFormInvalidSource = new BehaviorSubject<boolean>(null);
  isPopulatedFormInvalid = this.isPopulatedFormInvalidSource.asObservable();
}
