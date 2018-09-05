import { Component, OnInit } from '@angular/core';
// import {zingchart, Chart} from 'zingchart'


@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.css']
})
export class StockChartComponent implements OnInit {

  chart: Chart = {
    id:"chart-1",
    data: this.getMyConfig(),
    height:400,
    width:"100%"
  };

  constructor() { }
  ngAfterViewInit () {
    zingchart.render(this.chart);
  }
  ngOnInit() {
  }

  getMyConfig(){
    return {
      "graphset":[
          {
              "type":"mixed",
              "title":{
                  "text":"Stock & Volume Chart (January)"
              },
              "scale-y":{
                  "offset-start":"35%",
                  "values":"29:33:2",
                  "format":"$%v",
                  "label":{
                      "text":"Prices"
                  }
              },
              "scale-y-2":{
                  "blended":true,
                  "offset-end":"75%",
                  "placement":"default",
                  "values":"0:3:3",
                  "format":"%vM",
                  "label":{
                      "text":"Volume"
                  }
              },
              "crosshairX":{
                  "multiple":true,
                  "plotLabel":{
                      "headerText":"Day %kv<br><hr>",
                      "fontSize":16
                  }
              },
              "arrows":[
                  {
                      "backgroundColor":"#f90",
                      "length":15,
                      "size":2,
                      "alpha":1,
                      "offsetY":-30,
                      "borderWidth":2,
                      "borderColor":"#f60",
                      "border-radius":5,
                      "padding":5,
                      "to":{
                          "hook":"node:plot=0, index=12"
                      },
                      "label":{
                          "text":"Some Event Happend",
                          "offsetY":-55
                      }
                  }
              ],
              "labels":[
                  {
                      "hook":"node:plot=2,index=13",
                      "text":"Highest Sum Volume",
                      "padding":10,
                      "backgroundColor":"#f90",
                      "borderWidth":2,
                      "borderColor":"#f60",
                      "shadow":true,
                      "callout":true,
                      "calloutWidth":12,
                      "callout-height":15,
                      "border-radius":5,
                      "calloutPosition":"bottom",
                      "offset-y":-35,
                      "calloutTip":{
                          "type":"circle",
                          "background-color":"#fff",
                          "border-width":2,
                          "border-color":"#f60",
                          "size":4,
                          "shadow":true
                      }
                  }
              ],
              "series":[
                  {
                      "type":"stock",
                      "scales":"scale-x,scale-y",
                      "guideLabel":{
                          "text":"Open: %open<br>High: %high<br>Low: %low<br>Close: %close"
                      },
                      "values":[[31.34,31.46,30.87,31.06],
                      [31.8,32.25,31.52,32.05],
                      [32.05,32.57,31.93,32.3],
                      [32.21,32.39,31.98,32.08],
                      [32.32,32.38,32.13,32.37],
                      [32.52,32.53,31.95,32.03],
                      [32.07,32.14,31.77,31.98],
                      [32.26,32.33,31.61,31.86],
                      [31.65,31.85,31.41,31.78],
                      [31.86,31.97,31.56,31.58],
                      [31.51,31.65,31.45,31.59],
                      [31.84,31.87,31.55,31.85],
                      [31.83,32.08,31.71,32.04],
                      [32.3,32.36,31.96,32.28],
                      [32.43,32.88,32.29,32.48],
                      [32.72,32.74,32.4,32.6],
                      [32.39,32.46,32.2,32.38],
                      [32.47,32.49,31.81,31.84],
                      [31.84,32.2,31.78,32.08],
                      [31.88,32.11,31.82,31.89]]
                  },
                  {
                      "type":"bar",
                      "scales":"scale-x,scale-y-2",
                      "stacked":true,
                      "text":"volume 1",
                      "values":[1.3,1.5,2.1,2.2,1.9,1.7,1.8,1.9,1.9,2,1.4,2.1,2.3,2.6,2.5,2.3,1.5,2.4,1.6,1.4]
                  },
                  {
                      "type":"bar",
                      "scales":"scale-x,scale-y-2",
                      "stacked":true,
                      "text":"volume 2",
                      "values":[1.3,1.5,2.1,2.2,1.9,1.7,1.8,1.9,1.9,2,1.4,2.1,2.3,2.6,2.5,2.3,1.5,2.4,1.6,1.4]
                  }
              ]
          }
      ]
      };
  }

}
