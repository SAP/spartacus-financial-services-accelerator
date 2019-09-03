import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'cx-yform',
  templateUrl: './yform.component.html',
  styleUrls: ['./yform.component.scss'],
})
export class YformComponent {
  @ViewChild('iframe', { static: true }) iframe: ElementRef;

  /** A local version of the component Id that is
   *  used during resizing the orbeon frame. */
  private componentId: string;

  constructor(
    private cmsData: CmsComponentData<any>,
    private sanitizer: DomSanitizer
  ) {
    this.setupEventListener();
  }

  yformUrl$: Observable<SafeResourceUrl> = this.cmsData.data$.pipe(
    tap(data => (this.componentId = data.uid)),
    map(data => {
      // TOOD: make the url configurable. This is not the same baseUrl as the OCC baseUrl (different aspects on ccv2)
      // TODO: handle the dataId
      return `https://financialservices.local:9002/yacceleratorstorefront/yform?formId=${
        data.formId
        }&applicationId=${data.applicationId}&action=${
        data.action
        }&dataId=&cmsComponentId=${data.uid}`;
    }),
    map(url => this.sanitizer.bypassSecurityTrustResourceUrl(url))
  );

  /**
   * listen to post messages from orbeon window
   */
  private setupEventListener() {
    window.addEventListener(
      'message',
      ev => {
        // only handle events that are relevant to this component, based on
        // message `type` and `cmsComponentId`.
        if (
          ev.data.type &&
          ev.data.type === 'resize-orbeon-frame' &&
          ev.data.cmsComponentId === this.componentId
        ) {
          (<HTMLIFrameElement>this.iframe.nativeElement).style.height =
            ev.data.windowHeight + 'px';
        }
      },
      false
    );
  }
}