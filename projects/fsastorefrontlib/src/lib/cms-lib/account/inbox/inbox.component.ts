import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CmsService } from '@spartacus/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { CmsInboxComponent, CmsInboxTabComponent } from './../../../occ-models/cms-component.models';

@Component({
  selector: 'fsa-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InboxComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsInboxComponent>,
    protected cmsService: CmsService
  ) {}

  component$: Observable<CmsInboxComponent>;
  inboxTabs$: Observable<CmsInboxTabComponent>;
  ngOnInit() {
    this.component$ = this.componentData.data$;

    this.inboxTabs$ = this.getInboxTabs();
  }

  getInboxTabs(): Observable<CmsInboxTabComponent> {
    return this.component$.pipe(
      switchMap(data => {
        if (data) {
          const navigation = data.tabComponents.split(' ');
          const tabs:CmsInboxTabComponent[] = this.procesTabs(navigation);

          let itemsList = [];
          tabs.forEach(entry => {
            itemsList.push({
              superType: 'AbstractCMSComponent',
              id: entry.title
            });
          });

          this.cmsService.loadNavigationItems('CMSInboxTabComponent', itemsList);
          
          return this.cmsService.getNavigationEntryItems('CMSInboxTabComponent').pipe(
            tap(items => {
              if (items === undefined) {
                this.getNavigationEntryItems(navigation, true, []);
              }
            }),
            filter(items => items !== undefined),
          );
        }
      })
    );
  }

  procesTabs(tabs:string[]): CmsInboxTabComponent[]{
    let array: CmsInboxTabComponent[] = [];
    if(tabs && tabs.length>0){
      tabs.forEach(tab => {
        array.push({title: tab});
      });
    }
    return array;
  }

  public getNavigationEntryItems(nodeData: any, root: boolean, itemsList = []) {
    if (nodeData.children && nodeData.children.length > 0) {
      //this.processChildren(nodeData, itemsList);
    } else if (nodeData.entries && nodeData.entries.length > 0) {
      nodeData.entries.forEach(entry => {
        itemsList.push({
          superType: entry.itemSuperType,
          id: entry.itemId
        });
      });
    }

    if (root) {
      const rootUid = nodeData.uid;
      this.cmsService.loadNavigationItems(rootUid, itemsList);
    }
  }
}
