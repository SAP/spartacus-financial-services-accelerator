import { OccAgentAdapter } from './../../../occ/services/agent/occ-agent.adapter';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsAgentRootComponent } from '../../../occ/occ-models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'fsa-agent-root',
  templateUrl: './agent-root.component.html',
})
export class AgentRootComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CmsAgentRootComponent>,
    protected agentAdapter: OccAgentAdapter
  ) {}

  private subscription = new Subscription();
  agentList$;
  agentRootCategory;

  ngOnInit() {
    this.subscription.add(
      this.componentData.data$.subscribe(data => {
        this.agentRootCategory = data.agentRootCategory;
        this.agentList$ = this.agentAdapter.getAgentsByCategory(
          data.agentRootCategory
        );
      })
    );
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
