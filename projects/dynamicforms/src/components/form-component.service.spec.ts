import { TestBed } from '@angular/core/testing';
import { FormComponentService } from './form-component.service';

describe('FormComponentService', () => {
  let service: FormComponentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormComponentService],
    });

    service = TestBed.inject(FormComponentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
