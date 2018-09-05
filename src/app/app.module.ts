import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PredictorService } from './predictor.service';
import { AmChartModule } from "ng-amchart";
import { StockMarketChartComponent } from './stock-market-chart/stock-market-chart.component';



@NgModule({
  declarations: [
    AppComponent,
    StockMarketChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AmChartModule 
  ],
  providers: [PredictorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
