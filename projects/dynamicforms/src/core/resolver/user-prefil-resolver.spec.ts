import { TestBed } from '@angular/core/testing';
import { I18nTestingModule, UserService } from '@spartacus/core';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { UserPrefilResolver } from './user-prefil-resolver';

const mockUserServiceResponse = {
    firstName: "Donna",
    lastName: "Moore"
}
const fieldPath: string = 'firstName';
describe('UserResolver', () => {
    let service: UserPrefilResolver;
    let MockUserService = {
        get() {
            return of(mockUserServiceResponse)
        }
    }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule,
        StoreModule.forRoot({}),],
      providers: [
        { provide: UserService, useClass: MockUserService },
      ],
    });

  });

  it('should inject service', () => {
    expect(service).toBeTruthy();
  });

    it('should resolve user first name', () => {
        let result;
        service.getFieldValue(fieldPath).subscribe( res => ( result = res));
        
        expect( result.toEqual('Donna'));
    });
  
});
