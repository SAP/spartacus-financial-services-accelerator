import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { OccConfig, RoutingService } from '@spartacus/core';
import { FileService } from '@spartacus/dynamicforms';
import {
  ClaimService,
  PolicyService,
} from '../../../../core/my-account/facade';
import {
  AllowedFSRequestType,
  RequestType,
} from './../../../../occ/occ-models/occ.models';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'cx-fs-policies',
  templateUrl: './policies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoliciesComponent implements OnInit, OnDestroy {
  constructor(
    protected config: OccConfig,
    protected policyService: PolicyService,
    protected routingService: RoutingService,
    protected claimService: ClaimService,
    protected fileUploadService: FileService
  ) {}

  policies$;
  policiesLoaded$;
  baseUrl: string;
  chartOption: EChartsOption = {
    title: {
      show: true,
      text: 'Insurance premium amount by policies',
      left: 'center'
    },
    tooltip: {
        trigger: 'item',
        position: 'inside'
    },
    legend: {
        top: 'middle',
        // align: 'left',
        left: 'right',
        // bottom: 20,
        orient: 'vertical',
        itemGap: 25,
        itemWidth: 30
        // overflow: {
        //   verticalAlign: 'middle'
        // }
        // verticalyAlign: 'middle'
    },
    toolbox: {
      show: true,
      // left: 'left',
      // iconStyle: {
      //   color: '#0066cc'
      // },
      feature: {
          // mark: {show: true},
          // dataView: {show: true, readOnly: false},
          // restore: {show: true},
          saveAsImage: {show: true}
      }
  },
    series: [
        {
            name: 'Insurance',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: true,
                position: 'outside'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '20',
                    fontWeight: 'bold',
                    shadowOffsetY: 10,
                    textShadowOffsetY: 10
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1048, name: 'Travel'},
                {value: 735, name: 'Auto'},
                {value: 580, name: 'Life'},
                {value: 484, name: 'Renters'},
                {value: 300, name: 'Savings'}
            ]
        }
    ]
};

  private subscription = new Subscription();

  ngOnInit() {
    this.policyService.loadPolicies();
    this.policies$ = this.policyService.getPolicies();
    this.policies$.subscribe(data => console.log(data, 'policies'))
    this.policiesLoaded$ = this.policyService.getLoaded();
    this.baseUrl = this.config.backend.occ.baseUrl || '';
  }

  startClaim(policyId: string, contractNumber: string) {
    if (policyId && contractNumber) {
      this.fileUploadService.resetFiles();
      this.claimService.createClaim(policyId, contractNumber);
      this.subscription.add(
        this.claimService
          .getCurrentClaim()
          .pipe(
            map(claim => {
              if (claim && claim.configurationSteps) {
                this.routingService.go({
                  cxRoute: claim.configurationSteps[0].pageLabelOrId,
                });
              }
            })
          )
          .subscribe()
      );
    }
  }

  isPolicyCategoryAllowed(
    allowedFSRequestTypes: AllowedFSRequestType[]
  ): boolean {
    if (
      allowedFSRequestTypes !== undefined &&
      allowedFSRequestTypes.length > 0
    ) {
      return (
        allowedFSRequestTypes
          .map(allowedRequestType => allowedRequestType.requestType.code)
          .indexOf(RequestType.FSCLAIM) > -1
      );
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
