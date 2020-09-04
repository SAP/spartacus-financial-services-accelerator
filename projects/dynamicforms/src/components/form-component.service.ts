import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FormComponentService {
  constructor() {}

  populatedFormInvalidSource = new BehaviorSubject<boolean>(null);
  populatedFormInvalid = this.populatedFormInvalidSource.asObservable();
}
