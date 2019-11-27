import { OccAgentAdapter } from './../../../occ/services/agent/occ-agent.adapter';
import { Component, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsAgentRootComponent } from '../../../occ/occ-models';

@Component({
  selector: 'fsa-agent-root',
  templateUrl: './agent-root.component.html',
})
export class AgentRootComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsAgentRootComponent>,
    protected agentAdapter: OccAgentAdapter
  ) {}

  agentList$;
  agentRootCategory;

  ngOnInit() {
    this.componentData.data$
      .subscribe(data => {
        this.agentRootCategory = data.agentRootCategory;
        this.agentList$ = this.agentAdapter.getAgentsByCategory(
          data.agentRootCategory
        );
      })
      .unsubscribe();
  }
}
