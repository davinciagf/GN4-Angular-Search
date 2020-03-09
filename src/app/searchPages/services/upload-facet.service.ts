import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SearchRequestService} from "./search-request.service";

@Injectable({
  providedIn: 'root'
})

export class UploadFacetService {
  baseUrl: string = '/geonetwork/srv/api/search/records/_search';
  facetParameters: object = {
    "query": {
      "bool": {
        "must": []
      }
    },
    "size": 0
  };
  httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  constructor(private searchRequestService: SearchRequestService,
              private http: HttpClient) {
  }

  updateFacet(groupfield, elem) {
    this.facetParameters['aggregations']=elem;
    this.httpHeaders.append("Authorization", "Basic " + btoa("admin:admin"));
    let options = {
      headers: this.httpHeaders
    };
    this.http.post<any>(`${this.baseUrl}`, this.facetParameters, options).subscribe(facetResult => {
      this.searchRequestService.dimension.subscribe(data => {
        data[0].aggregations[groupfield]=facetResult.aggregations[groupfield]
      })
    }, error => console.log(error,'Could not load facet.'));
  }
}
