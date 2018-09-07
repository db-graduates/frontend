import { Component, OnInit } from '@angular/core';
import { AmChartsService} from "ng-amchart";
import { PredictorService } from '../predictor.service';
import { DiffData } from '../model/diffData';
import {timer} from 'rxjs';
import {take} from 'rxjs/operators';  

@Component({
  selector: 'app-stock-market-chart',
  templateUrl: './stock-market-chart.component.html',
  styleUrls: ['./stock-market-chart.component.css']
})
export class StockMarketChartComponent implements OnInit {

  private chart:any;
  private realData = [];
  private predictChart:any;
  private predictData = [];

  constructor(protected amchartSvc:AmChartsService, private _predictor: PredictorService) { }

  ngOnInit() {
    this.generateChartData();
  }

  ngAfterViewInit() {

    this.chart = this.amchartSvc.makeChart("chart1div", this.getChartWithData(this.realData));
    this.predictChart = this.amchartSvc.makeChart("chart3div", this.getChartWithData(this.predictData));

    timer(5000, 5000).pipe().subscribe(()=>{
      this.updateChartForRealTime();
   })
    
  }


  ngOnDestroy() {
    if (this.chart) {
      this.amchartSvc.destroyChart(this.chart);
    }
  }

  updateChartForRealTime() {
    // if ( this.chart.mouseDown )
    //   return;

    var lastDate = new Date(this.chart.dataSets[ 0 ].dataProvider[ this.chart.dataSets[ 0 ].dataProvider.length - 1 ].date);
    var now = new Date(lastDate);
    now.setMinutes(lastDate.getMinutes() + 30);

    console.log("Update from " + lastDate + " to " + now)

    this._predictor.predict(lastDate, now)
    .subscribe((data : DiffData) => {

      console.log(data.actualData);

      this.fillOneChartData(data.actualData, this.chart.dataSets[ 0 ].dataProvider); 
      this.fillOneChartData(data.predictedData, this.predictChart.dataSets[ 0 ].dataProvider);
      
    });
    this.chart.validateData();
    this.predictChart.validateData();
  }

  fillOneChartData(source, target){
    source.forEach(data => {
      target.push({
        "date": data.date,
        "open": data.open,
        "close": data.close,
        "high": data.high,
        "low": data.low,
        "volume": data.volume,
        "value": data.value})
        });
  }

  generateChartData() {

    this._predictor.predict(new Date("2018-09-06T14:00:00.900"), new Date("2018-09-06T23:34:50.900"))
        .subscribe((data : DiffData) => {

          data.predictedData.forEach(data => {
            this.predictData.push({
              "date": data.date,
              "open": data.open,
              "close": data.close,
              "high": data.high,
              "low": data.low,
              "volume": data.volume,
              "value": data.value})
              });

          data.actualData.forEach(data => {
            this.realData.push({
              "date": data.date,
              "open": data.open,
              "close": data.close,
              "high": data.high,
              "low": data.low,
              "volume": data.volume,
              "value": data.value})
              });
        });
  
  }

  getChartWithData(data){
    return {
      "type": "stock",
      "theme": "light",
    
      "categoryAxesSettings": {
        "minPeriod": "mm"
      },
    
      "dataSets": [ {
        "fieldMappings": [ {
          "fromField": "open",
          "toField": "open"
        }, {
          "fromField": "close",
          "toField": "close"
        }, {
          "fromField": "high",
          "toField": "high"
        }, {
          "fromField": "low",
          "toField": "low"
        }, {
          "fromField": "volume",
          "toField": "volume"
        }, {
          "fromField": "value",
          "toField": "value"
        } ],
    
        "color": "#7f8da9",
        "dataProvider": data,
        "title": "West Stock",
        "categoryField": "date"
      }],
    
    
      "panels": [ {
          "title": "Value",
          "showCategoryAxis": false,
          "percentHeight": 70,
          "valueAxes": [ {
            "dashLength": 5
          } ],
    
          "categoryAxis": {
            "dashLength": 5
          },
    
          "stockGraphs": [ {
            "type": "candlestick",
            "id": "g1",
            "openField": "open",
            "closeField": "close",
            "highField": "high",
            "lowField": "low",
            "valueField": "close",
            "lineColor": "#7f8da9",
            "fillColors": "#7f8da9",
            "negativeLineColor": "#db4c3c",
            "negativeFillColors": "#db4c3c",
            "fillAlphas": 1,
            "useDataSetColors": false,
            "comparable": true,
            "compareField": "value",
            "showBalloon": false
          } ],
  
          "stockLegend": {
            "valueTextRegular": undefined,
            "periodValueTextComparing": "[[percents.value.close]]%"
          }
        },
    
        {
          "title": "Volume",
          "percentHeight": 30,
          "marginTop": 1,
          "showCategoryAxis": true,
          "valueAxes": [ {
            "dashLength": 5
          } ],
    
          "categoryAxis": {
            "dashLength": 5
          },
    
          "stockGraphs": [ {
            "valueField": "volume",
            "type": "column",
            "showBalloon": false,
            "fillAlphas": 1
          } ],
    
          "stockLegend": {
            "markerType": "none",
            "markerSize": 0,
            "labelText": "",
            "periodValueTextRegular": "[[value.close]]"
          }
        }
      ],
    
      "chartScrollbarSettings": {
        "graph": "g1",
        "graphType": "line",
        "usePeriod": "hh"
      },
    
      "periodSelector": {
        "position": "top",
        "dateFormat": "YYYY-MM-DD JJ:NN",
        "inputFieldWidth": 150,
        "periods": [ {
          "period": "hh",
          "count": 1,
          "label": "1 hour",
          "selected": true
    
        }, {
          "period": "hh",
          "count": 2,
          "label": "2 hours"
        }, {
          "period": "hh",
          "count": 5,
          "label": "5 hour"
        }, {
          "period": "hh",
          "count": 12,
          "label": "12 hours"
        }, {
          "period": "MAX",
          "label": "MAX"
        } ]
      }
    };
  }


}
