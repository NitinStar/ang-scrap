import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServicesService {
  uri = 'http://localhost:6001';
  constructor(private http: HttpClient) { }

  getScrapData(reqObj) {
    var api = this.uri + '/assignment/get-scrapped-data';

    return this
      .http
      .post(api, reqObj);
  }

}
