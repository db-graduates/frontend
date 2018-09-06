import { Component } from '@angular/core';
import { PredictorService } from './predictor.service';
import { Chart } from 'chart.js';
import { ChartData } from './model/chartData';
import { DiffData } from './model/diffData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private _predictor: PredictorService) {}

  ngOnInit() {
  }
}