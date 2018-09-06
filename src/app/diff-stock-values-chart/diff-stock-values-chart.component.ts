import { Component, OnInit } from '@angular/core';
import { AmChartsService} from "ng-amchart";
import { PredictorService } from '../predictor.service';
import { DiffData } from '../model/diffData';
import {timer} from 'rxjs';
import {take} from 'rxjs/operators';  

@Component({
  selector: 'app-diff-stock-values-chart',
  templateUrl: './diff-stock-values-chart.component.html',
  styleUrls: ['./diff-stock-values-chart.component.css']
})
export class DiffStockValuesChartComponent implements OnInit {

  private chart:any;
  private realData = [];
  private predictedData = [];
  

  constructor(protected amchartSvc:AmChartsService, private _predictor: PredictorService) { }

  ngOnInit() {
    this.generateChartData();
  }

  ngAfterViewInit() {

    this.chart = this.amchartSvc.makeChart("chart2div", this.getChart());
    // setInterval(this.updateChartForRealTime(), 1000);
    timer(5000, 5000).pipe().subscribe(()=>{
          this.updateChartForRealTime();
       })
  }

  ngOnDestroy() {
    if (this.chart) {
      this.amchartSvc.destroyChart(this.chart);
    }
  }
  

  generateChartData() {

    this._predictor.predict(new Date("2018-09-07T14:00:00.900"), new Date("2018-09-07T23:34:50.900"))
        .subscribe((data : DiffData) => {

          this.fillOneChartData(data.predictedData, this.predictedData);
          this.fillOneChartData(data.actualData, this.realData);  
          
        });

  }

  fillOneChartData(source, target){
    source.forEach(data => {
      target.push({
        "date": data.date,
        "value": data.close,
        "volume": data.volume})
        });
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
      this.fillOneChartData(data.predictedData,  this.chart.dataSets[ 1 ].dataProvider);  
      
    });
    this.chart.validateData();
  }

getChart(){
  return {
    "type": "stock",
    "theme": "light",

    "categoryAxesSettings": {
      "minPeriod": "mm"
    },

    "dataSets": [ {
        "title": "Real data set",
        "fieldMappings": [ {
          "fromField": "value",
          "toField": "value"
        }, {
          "fromField": "volume",
          "toField": "volume"
        } ],
        "dataProvider": this.realData,
        "categoryField": "date"
      }, {
        "title": "Predicted data set",
        "fieldMappings": [ {
          "fromField": "value",
          "toField": "value"
        }, {
          "fromField": "volume",
          "toField": "volume"
        } ],
        "dataProvider": this.predictedData,
        "categoryField": "date"
      }
    ],
  
    "panels": [ {
      "showCategoryAxis": false,
      "title": "Close",
      "percentHeight": 70,
      "stockGraphs": [ {
        "id": "g1",
        "valueField": "value",
        "comparable": true,
        "compareField": "value",
        "balloonText": "[[title]]:<b>[[value]]</b>",
        "compareGraphBalloonText": "[[title]]:<b>[[value]]</b>"
      } ],
      "stockLegend": {
        "periodValueTextComparing": "[[percents.value.close]]%",
        "periodValueTextRegular": "[[value.close]]"
      }
    }, {
      "title": "Volume",
      "percentHeight": 30,
      "stockGraphs": [ {
        "valueField": "volume",
        "type": "column",
        "showBalloon": false,
        "fillAlphas": 1
      } ],
      "stockLegend": {
        "periodValueTextRegular": "[[value.close]]"
      }
    } ],
  
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
        "label": "1 hour"
  
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
        "label": "MAX",
        "selected": true
      } ]
    },
  
    "dataSetSelector": {
      "position": "left"
    }

  };
}

}
