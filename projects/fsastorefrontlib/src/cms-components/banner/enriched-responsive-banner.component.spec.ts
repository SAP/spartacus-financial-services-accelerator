import { Component, DebugElement, Input } from '@angular/core';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { CmsBannerComponent, CmsComponent } from '@spartacus/core';
import { of } from 'rxjs';
import { EnrichedResponsiveBannerComponent } from './enriched-responsive-banner.component';
import { CmsComponentData } from '@spartacus/storefront';

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

  const componentData: CmsBannerComponent = {
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
  };

  const MockCmsComponentData = <CmsComponentData<CmsComponent>>{
    data$: of(componentData),
    uid: 'test',
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [EnrichedResponsiveBannerComponent, MockMediaComponent],
        providers: [
          {
            provide: CmsComponentData,
            useValue: MockCmsComponentData,
          },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrichedResponsiveBannerComponent);
    enrichedBannerComponent = fixture.componentInstance;
    el = fixture.debugElement;
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
    expect(el.query(By.css('.enriched-banner-styled-text'))).toBeTruthy();
  });
});
