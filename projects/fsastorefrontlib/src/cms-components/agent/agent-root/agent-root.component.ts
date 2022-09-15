import { Component, OnDestroy, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { Subscription } from 'rxjs';
import { AgentConnector } from '../../../core/agent/connectors/agent.connector';
import { CmsAgentRootComponent } from '../../../occ/occ-models';

@Component({
  selector: 'cx-fs-agent-root',
  templateUrl: './agent-root.component.html',
})
export class AgentRootComponent implements OnInit, OnDestroy {
  constructor(
    protected componentData: CmsComponentData<CmsAgentRootComponent>,
    protected agentConnector: AgentConnector
  ) {}

  private subscription = new Subscription();
  agentList$;
  agentRootCategory;

  ngOnInit() {
    this.subscription.add(
      this.componentData.data$.subscribe(data => {
        this.agentRootCategory = data.agentRootCategory;
        this.agentList$ = this.agentConnector.getAgentsByCategory(
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
