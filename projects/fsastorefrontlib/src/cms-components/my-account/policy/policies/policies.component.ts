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
import { filter, map, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { EChartsOption } from 'echarts';

let COLOR_PALETTE = [
  ['Travel', { color: '#000066' }],
  ['Auto', { color: '#0066CC', opacity: 0.85 }],
  ['Life', { color: '#0066CC' }],
  ['Renters', { color: '#3498DB' }],
  ['Savings', { color: '#000033', opacity: 0.9 }]
]
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
  colorPaletteMap = new Map<string, any>();
  chartOption: EChartsOption;
  options: any[];
  dynamicData: EChartsOption;
  isChartVisbible: boolean;
  selectedFrequency: string = 'Single';
  on: boolean;

  private subscription = new Subscription();

  ngOnInit() {
    this.options = [
      {name: 'Single', label: 'Single'},
      {name: 'Monthly', label: 'Monthly'},
      {name: 'Quarterly', label: 'Quarterly'},
      {name: 'Half-yearly', label: 'Half-yearly'},
      {name: 'Annually', label: 'Annually'},
    ]
    this.setColorPalette();
    this.initChart();
    this.policyService.loadPolicies();
    this.policies$ = this.policyService.getPolicies();
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

  setColorPalette() {
    // dinamicaly set
    this.colorPaletteMap.set('Travel', { color: '#000066', opacity: 0.8 });
    this.colorPaletteMap.set('Auto', { color: '#0066CC', opacity: 0.85 });
    this.colorPaletteMap.set('Life', { color: '#0066CC' });
    this.colorPaletteMap.set('Renters', { color: '#3498DB' });
    this.colorPaletteMap.set('Savings', { color: '#000033', opacity: 0.9 });
    this.colorPaletteMap.set('Event', { color: '#000066' });
    this.colorPaletteMap.set('Homeowners', { color: '#3498DB', opacity: 0.8 });
    this.colorPaletteMap.set('Selected', { color: '#D3D6DB' });
  }

  initChart() {
    this.chartOption = {
      title: {
        show: true,
        text: 'Insurance premium amount by policies',
        left: 'center',
        padding: 20
      },
      tooltip: {
          trigger: 'item',
          position: 'inside',
          formatter: '{b}: {d}%'
      },
      legend: {
          top: 'middle',
          left: 'right',
          orient: 'vertical',
          itemGap: 25,
          itemWidth: 40
      },
      toolbox: {
        show: true,
        feature: {
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
                  borderWidth: 2,
              },
              label: {
                  show: true,
                  position: 'outside',
                  // formatter: '{b}: {d}%'
                  formatter: function(params) {
                    let res = '';
                    res += params.name + ': ' + params.value.toLocaleString();
                    return res;
                  }
              },
              emphasis: {
                  label: {
                      show: true,
                      fontSize: '20',
                      fontWeight: 'bold',
                  }
              },
              labelLine: {
                  show: true
              },
              data: [
                  {value: 1048, name: 'Travel', itemStyle: this.colorPaletteMap.get('Travel')},
                  {value: 735, name: 'Auto', itemStyle: this.colorPaletteMap.get('Auto')},
                  {value: 580, name: 'Life', itemStyle: this.colorPaletteMap.get('Life')},
                  {value: 484, name: 'Renters', itemStyle: this.colorPaletteMap.get('Renters')},
                  {value: 300, name: 'Savings', itemStyle: this.colorPaletteMap.get('Savings')}
              ]
          }
      ]
  };
  }

  selectPaymentFrequency() {
    if(!this.selectedFrequency) {
      this.isChartVisbible = false;
      return;
    }
    this.dynamicData = this.chartOption;
    // reinitialize data for chart
    this.dynamicData.series[0].data = [
      {value: 900, name: 'Travel', itemStyle: this.colorPaletteMap.get('Travel')},
      {value: 200, name: 'Auto', itemStyle: this.colorPaletteMap.get('Auto')},
      {value: 350, name: 'Life', itemStyle: this.colorPaletteMap.get('Life')},
      {value: 500, name: 'Renters', itemStyle: this.colorPaletteMap.get('Renters')},
      {value: 650, name: 'Savings', itemStyle: this.colorPaletteMap.get('Savings')},
      {value: 150, name: 'Event', itemStyle: this.colorPaletteMap.get('Event')}
    ];
  }

  toggleChartVisibility() {
    this.isChartVisbible = !this.isChartVisbible;
    if (!this.isChartVisbible) {
      this.selectedFrequency = 'Single';
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
