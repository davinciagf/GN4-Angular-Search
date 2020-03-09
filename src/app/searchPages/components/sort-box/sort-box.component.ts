import { Component, OnInit } from '@angular/core';
import {SearchRequestService} from "../../services/search-request.service";
import {ParamRequestService} from "../../services/param-request.service";
import {UiParamService} from "../../services/ui-param.service";
import { FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";

@Component({
  selector: 'app-sort-box',
  templateUrl: './sort-box.component.html',
  styleUrls: ['./sort-box.component.scss']
})
export class SortBoxComponent implements OnInit {
  sortFormBox: FormGroup;
  paramRequest: Observable<any[]>;
  requestParameters:object;
  sortParameters:object;
  sortSelect:string;
  uiParamters_sortbyValues:object;
  uiParamters_sortby:string;

  constructor(private searchRequestService: SearchRequestService,
              private paramRequestService: ParamRequestService,
              private uiParamService: UiParamService) { }

  ngOnInit() {
    this.uiParamService.getUIParam()
      .subscribe(resp => {
          console.log(JSON.parse(resp.configuration).mods);
          this.uiParamters_sortbyValues = JSON.parse(resp.configuration).mods.search.sortbyValues
          this.uiParamters_sortby = JSON.parse(resp.configuration).mods.search.sortBy
          this.paramRequest = this.paramRequestService.paramRequest;
          this.paramRequest.subscribe((data: {}) => {
            this.requestParameters=data;
            if(data[0]){
              this.sortParameters = data[0].sort;
              //TO DO - QUESTION - '_score' with sortby ==> equivalent to sortby=revelance???
              console.log(this.sortParameters);
              if (data[0].sort.length === 1 && data[0].sort[0] ==='_score'){
                this.sortSelect=this.uiParamters_sortbyValues[0].sortBy;
              } else {
                this.sortSelect=this.uiParamters_sortby;
              }
            }
          });
        },
        error => {
          console.log(error, "error");
        });

    this.sortFormBox = new FormGroup({
      sortField: new FormControl(''),
    });
  }

  sort(sortby,sortOrder) {
    //TO DO - QUID sortOrder reverse???
    //console.log(sortOrder)
    let sortParameter={};
    sortParameter[sortby]="asc"
    let sort =[];
    sort.push(sortParameter);
    sort.push("_score");
    this.paramRequestService.updatedSortSearch(sort);
    this.searchRequestService.loadAll();
  }
}
