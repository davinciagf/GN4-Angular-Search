import { Component, OnInit } from '@angular/core';
import {SearchRequestService} from "../search-request.service";
import {ParamRequestService} from "../param-request.service";
import {Observable} from "rxjs";
import {UiParamService} from "../ui-param.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit {
  length:number;
  dimension: Observable<any[]>;
  paramRequest: Observable<any[]>;
  mtdPagination:number;
  fromPagination:number;
  requestParameters:object;
  uiParamters_paginationInfo:number;
  uiParamters_hitsperpageValues:number[];

  constructor(private searchRequestService: SearchRequestService,
              private paramRequestService: ParamRequestService,
              private uiParamService: UiParamService) { }

  ngOnInit() {
    this.uiParamService.getUIParam()
      .subscribe(resp => {
        console.log(JSON.parse(resp.configuration).mods);
        this.uiParamters_hitsperpageValues = JSON.parse(resp.configuration).mods.search.hitsperpageValues;
        this.uiParamters_paginationInfo = JSON.parse(resp.configuration).mods.search.paginationInfo.hitsPerPage;
      });
    this.paramRequest = this.paramRequestService.paramRequest;
    this.paramRequest.subscribe((data: {}) => {
      this.requestParameters=data;
      if(data[0]){
        this.mtdPagination = data[0].size;
        this.uiParamters_paginationInfo =data[0].size;
        this.fromPagination =data[0].from;
      }
    });
    this.dimension = this.searchRequestService.metadata;
    this.dimension.subscribe((data: {}) => {
      if(data[0]){
        this.length = Math.ceil(data[0].hits.total.value/data[0].hits.hits.length);
      }
    })
  }

  onPageChanged(e) {
    if (e.pageSize != this.mtdPagination){
      this.paramRequestService.updatedSearchSize(e.pageSize);
      this.searchRequestService.loadAll();
    }
    if (e.pageIndex != this.fromPagination){
      this.paramRequestService.updatedSearchIndex(e.pageIndex);
      this.searchRequestService.loadAll();
    }
  }
}
