import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PredictorService } from './predictor.service';
import { StockChartComponent } from './stock-chart/stock-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    StockChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule 
  ],
  providers: [PredictorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
