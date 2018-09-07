import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PredictorService {

  constructor(private _http: HttpClient) { }

  predict(dateTo, dateFrom) {
    let url = "http://localhost:8083/chart-data/diff?dateFrom=" + dateTo.toISOString() + "&dateTo=" + dateFrom.toISOString();
    return this._http.get(url)
      .pipe(map(result => result));
  }

}
