import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { EnrichedResponsiveBannerComponent } from './enriched-responsive-banner.component';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsEnrichedResponsiveBannerComponent } from '../../occ/occ-models/cms-component.models';

const config = {
  textBox: true,
  textBoxType: 'box',
  textBoxVerticalPosition: 'middle',
  textBoxHorizontalPosition: 'left',
  textBoxMaxWidth: '410px',
  textBoxMargin: '0 0 0 17%',
  textBoxPadding: '2vw',
  textBoxTextPosition: 'left',
};

const componentData: CmsEnrichedResponsiveBannerComponent = {
  uid: 'SiteLogoComponent',
  typeCode: 'EnrichedResponsiveBannerComponent',
  name: 'Site Logo Component',
  container: 'false',
  external: 'false',
  media: {
    code: '/images/theme/logo_fsa.jpg',
    mime: 'image/svg+xml',
    altText: 'Financial Services Accelerator',
    url: '/medias/logo-fsa.jpg',
  },
  urlLink: '/logo',
  headingText: 'Test heading text',
  styledText: 'Test details text',
};

class MockCmsComponentData {
  data$ = of({ ...componentData, configStyles: JSON.stringify({ config }) });
}
@Component({
  // tslint:disable
  selector: 'cx-media',
  template: '',
})
class MockMediaComponent {
  @Input() container;
}

describe('EnrichedResponsiveBannerComponent', () => {
  let enrichedBannerComponent: EnrichedResponsiveBannerComponent;
  let fixture: ComponentFixture<EnrichedResponsiveBannerComponent>;
  let el: DebugElement;
  let mockCmsComponentData: CmsComponentData<CmsEnrichedResponsiveBannerComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [EnrichedResponsiveBannerComponent, MockMediaComponent],
        providers: [
          {
            provide: CmsComponentData,
            useClass: MockCmsComponentData,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrichedResponsiveBannerComponent);
    enrichedBannerComponent = fixture.componentInstance;
    el = fixture.debugElement;
    mockCmsComponentData = fixture.debugElement.injector.get(CmsComponentData);
  });

  it('should create enriched banner component in CmsLib', () => {
    expect(enrichedBannerComponent).toBeTruthy();
  });

  it('should contain cx-media', () => {
    fixture.detectChanges();
    expect(el.query(By.css('cx-media'))).toBeTruthy();
  });

  it('should contain title and text', () => {
    fixture.detectChanges();
    expect(el.query(By.css('.enriched-banner-title'))).toBeTruthy();
    expect(el.query(By.css('.enriched-banner-text'))).toBeTruthy();
  });

  it('should position box vertical center', () => {
    componentData.configStyles = JSON.stringify({
      config: { ...config, textBoxHorizontalPosition: 'right' },
    });
    mockCmsComponentData.data$ = of(componentData);
    fixture.detectChanges();
    expect(el.query(By.css('.vertical-center'))).toBeTruthy();
  });

  it('should position box vertical absolute center', () => {
    componentData.configStyles = JSON.stringify({
      config: {
        ...config,
        textBoxHorizontalPosition: 'center',
      },
    });
    mockCmsComponentData.data$ = of(componentData);
    fixture.detectChanges();
    expect(el.query(By.css('.absolute-center'))).toBeTruthy();
  });

  it('should position box horizontal center', () => {
    componentData.configStyles = JSON.stringify({
      config: {
        ...config,
        textBoxHorizontalPosition: 'center',
        textBoxVerticalPosition: 'top',
      },
    });
    mockCmsComponentData.data$ = of(componentData);
    fixture.detectChanges();
    expect(el.query(By.css('.horizontal-center'))).toBeTruthy();
  });

  it('should show strip view', () => {
    componentData.configStyles = JSON.stringify({
      config: {
        ...config,
        textBoxType: 'strip',
      },
    });
    mockCmsComponentData.data$ = of(componentData);
    fixture.detectChanges();
    expect(el.query(By.css('.enriched-banner-text-strip'))).toBeTruthy();
  });

  it('should not apply styles if there is no config', () => {
    componentData.configStyles = JSON.stringify({});
    mockCmsComponentData.data$ = of(componentData);
    fixture.detectChanges();
    expect(el.query(By.css('.left'))).toBeFalsy();
  });
});
