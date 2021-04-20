import { Component, OnDestroy, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cx-fs-policies-chart',
  templateUrl: './policies-chart.component.html',
  styleUrls: ['./policies-chart.component.scss']
})
export class PoliciesChartComponent implements OnInit, OnDestroy {

  colorPaletteMap = new Map<string, any>();
  chartOption: EChartsOption;
  options: any[];
  dynamicData: EChartsOption;
  isChartVisbible: boolean;
  selectedFrequency: string = 'Single';
  on: boolean;
  private subscription = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.options = [
      {name: 'Single', label: 'Single'},
      {name: 'Monthly', label: 'Monthly'},
      {name: 'Quarterly', label: 'Quarterly'},
      {name: 'Half-yearly', label: 'Half-yearly'},
      {name: 'Annually', label: 'Annually'},
    ];
    this.initChart();
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
        // feature: {
        //     saveAsImage: {show: true}
        // }
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
