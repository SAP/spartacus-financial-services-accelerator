import { Component, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsAgentRootComponent } from '../../../occ/occ-models';
import { AgentConnector } from '../../../core/agent/connectors';

@Component({
  selector: 'fsa-agent-root',
  templateUrl: './agent-root.component.html',
})
export class AgentRootComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsAgentRootComponent>,
    protected agentConnector: AgentConnector
  ) {}

  agentList$;
  agentRootCategory;

  ngOnInit() {
    this.componentData.data$
      .subscribe(data => {
        this.agentRootCategory = data.agentRootCategory;
        this.agentList$ = this.agentConnector.getAgentsByCategory(
          data.agentRootCategory
        );
      })
      .unsubscribe();
  }
}
