import { Component, OnInit } from '@angular/core';
import { CmsComponentData } from '@spartacus/storefront';
import { CmsAgentRootComponent } from '../../../occ-models';
import { OccAgentService } from '../../../occ/agent/agent.service';

@Component({
  selector: 'fsa-agent-root',
  templateUrl: './agent-root.component.html',
})
export class AgentRootComponent implements OnInit {
  constructor(
    protected componentData: CmsComponentData<CmsAgentRootComponent>,
    protected agentService: OccAgentService
  ) {}

  agentList$;
  agentRootCategory;

  ngOnInit() {
    this.componentData.data$
      .subscribe(data => {
        this.agentRootCategory = data.agentRootCategory;
        this.agentList$ = this.agentService.getAgentsByCategory(
          data.agentRootCategory
        );
      })
      .unsubscribe();
  }
}
