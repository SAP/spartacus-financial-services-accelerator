import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { SearchBoxComponent } from './search-box.component';
import { CmsModuleConfig } from '../../cms/cms-module-config';
import { PictureComponent } from '../../ui/components/media/picture/picture.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { BootstrapModule } from '../../bootstrap.module';
import { CmsService } from '../../cms/facade/cms.service';
import { CmsComponentData, ProductSearchService } from '@spartacus/storefront';
import { SearchBoxComponentService } from './search-box-component.service';
import { RouterModule } from '@angular/router';

const UseCmsModuleConfig: CmsModuleConfig = {
  cmsComponentMapping: {
    SearchBoxComponent: 'SearchBoxComponent'
  }
};

describe('SearchBoxComponent in CmsLib', () => {
  let searchBoxComponent: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let serviceSpy: any;

  const mockSearchBoxComponentData = {
    uid: '001',
    typeCode: 'SearchBoxComponent',
    modifiedTime: '2017-12-21T18:15:15+0000',
    name: 'Mock SearchBox',
    type: 'SearchBox Component',
    displayProductImages: 'true',
    displayProducts: 'true',
    displaySuggestions: 'true',
    container: 'false',
    maxProducts: '5',
    maxSuggestions: '5',
    minCharactersBeforeRequest: '3',
    waitTimeBeforeRequest: '500'
  };

  const MockCmsService = {
    getComponentData: () => of(mockSearchBoxComponentData)
  };

  const mockKeyEvent1 = {
    key: 'Enter'
  };

  const mockKeyEvent2 = {
    key: 'Enter123'
  };

  class SearchBoxComponentServiceSpy {
    launchSearchPage = jasmine.createSpy('launchSearchPage');
    search = jasmine.createSpy('search').and.callFake(() => of([]));
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BootstrapModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
      ],
      declarations: [SearchBoxComponent, PictureComponent],
      providers: [
        { provide: CmsService, useValue: MockCmsService },
        { provide: CmsModuleConfig, useValue: UseCmsModuleConfig },
        {
          provide: ProductSearchService,
          useValue: {}
        },
        {
          provide: CmsComponentData,
          useValue: {
            data$: of({})
          }
        }
      ]
    })
      .overrideComponent(SearchBoxComponent, {
        set: {
          providers: [
            {
              provide: SearchBoxComponentService,
              useClass: SearchBoxComponentServiceSpy
            }
          ]
        }
      })

      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    searchBoxComponent = fixture.componentInstance;

    serviceSpy = fixture.debugElement.injector.get(
      SearchBoxComponentService
    ) as any;

    spyOn(searchBoxComponent, 'onKey').and.callThrough();
    //    spyOn(searchBoxComponent, 'launchSearchPage').and.callThrough();
    spyOn(searchBoxComponent.searchBoxControl, 'reset').and.callThrough();
  });

  it('should be created', () => {
    expect(searchBoxComponent).toBeTruthy();
  });

  it('should dispatch new search query on text update', () => {
    searchBoxComponent.searchBoxControl.setValue('testQuery');
    expect(searchBoxComponent.searchBoxControl.value).toEqual('testQuery');
    fixture.detectChanges();
    expect(serviceSpy.search).toHaveBeenCalled();
  });

  it('should dispatch new search query on input', () => {
    searchBoxComponent.queryText = 'test input';
    expect(searchBoxComponent.searchBoxControl.value).toEqual('test input');
    fixture.detectChanges();
    expect(serviceSpy.search).toHaveBeenCalled();
  });

  it('should call onKey(event: any) and launchSearchPage(query: string)', () => {
    searchBoxComponent.onKey(mockKeyEvent1);
    expect(searchBoxComponent.onKey).toHaveBeenCalled();
    expect(serviceSpy.launchSearchPage).toHaveBeenCalled();
  });

  it('should only call onKey(event: any)', () => {
    searchBoxComponent.onKey(mockKeyEvent2);
    expect(searchBoxComponent.onKey).toHaveBeenCalled();
    expect(serviceSpy.launchSearchPage).not.toHaveBeenCalled();
  });

  describe('UI tests', () => {
    it('should contain an input text field', () => {
      expect(
        fixture.debugElement.query(By.css('input[type="text"]'))
      ).not.toBeNull();
    });
    // TODO: UI test once auto complete is no longer with material
  });
});
