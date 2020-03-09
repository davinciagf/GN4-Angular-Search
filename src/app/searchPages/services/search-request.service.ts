import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ParamRequestService } from "./param-request.service";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class SearchRequestService {
  baseUrl:string = '/geonetwork/srv/api/search/records/_search?bucket=s101';
  private _metadata = new BehaviorSubject<any[]>([]);
  private mtdStore: { searchResult: any[] } = { searchResult: [] };
  readonly metadata = this._metadata.asObservable();
  private _dimension = new BehaviorSubject<any[]>([]);
  private dimensionStore: { searchResult: any[] } = { searchResult: [] };
  readonly dimension = this._dimension.asObservable();
  httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  params:any;

  constructor(private http: HttpClient,private paramRequestService: ParamRequestService) { }

  loadAll() {
    this.paramRequestService.getParams();
    this.paramRequestService.paramRequest.subscribe(data => {
      this.params= data[0];
    });
    this.httpHeaders.append("Authorization", "Basic " + btoa("admin:admin"));
    let options = {
      headers: this.httpHeaders
    };
    this.http.post<any>(`${this.baseUrl}`, this.params, options).subscribe(data => {
      let aggregations={};
      let elem ={};
      _.forEach(data.aggregations, function(value, key) {
        if (Array.isArray(value.buckets) === false){
          const result = _.map(value.buckets, (elem, key) => ({ 'key':key , 'doc_count':elem.doc_count}));
          let bucket ={};
          bucket['buckets'] = result;
          elem[key] = bucket;
        } else if (value.buckets.length>0) {
          elem[key] = value;
        } else{}
      });
      aggregations['aggregations']=elem;
      aggregations['paramsRequest']=this.params;
      this.mtdStore.searchResult = [];
      this.dimensionStore.searchResult = [];
      this.mtdStore.searchResult.push(data);
      this.dimensionStore.searchResult.push(aggregations);
      this._metadata.next(Object.assign({}, this.mtdStore).searchResult);
      this._dimension.next(Object.assign({}, this.dimensionStore).searchResult);
    }, error => console.log(error, 'Could not load metadata.'));
  }
}
