import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { SpinnerModule } from '../../../ui/components/spinner/spinner.module';
import { StoreFinderService } from '../../services';
import { StoreFinderStoresCountComponent } from './store-finder-stores-count.component';

import * as fromReducers from '../../store';

describe('StoreFinderListCountComponent', () => {
  let component: StoreFinderStoresCountComponent;
  let fixture: ComponentFixture<StoreFinderStoresCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        SpinnerModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('stores', fromReducers.reducers),
        RouterTestingModule
      ],
      declarations: [StoreFinderStoresCountComponent],
      providers: [StoreFinderService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreFinderStoresCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
