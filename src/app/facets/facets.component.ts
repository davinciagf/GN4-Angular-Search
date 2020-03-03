import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {Observable} from "rxjs";
import {SearchRequestService} from "../search-request.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ParamRequestService} from "../param-request.service";
import * as _ from 'lodash';
import {UploadFacetService} from "../upload-facet.service";
import {UiParamService} from "../ui-param.service";

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args:string[]) : any {
    let keys = [];
    for (let key in value) {
      keys.push({key: key, value: value[key]});
    }
    return keys;
  }
}

@Component({
  selector: 'app-facets',
  templateUrl: './facets.component.html',
  styleUrls: ['./facets.component.scss']
})

export class FacetsComponent implements OnInit {
  dimension: Observable<any[]>;
  paramRequest: Observable<any[]>;
  facetForm:FormGroup;
  facetList: Object = {};
  uiParamters_facetConfig:Object = {};

  constructor(private searchRequestService: SearchRequestService,
              private paramRequestService: ParamRequestService,
              private uploadFacetService: UploadFacetService,
              private uiParamService:UiParamService) { }

  ngOnInit() {
    this.uiParamService.getUIParam()
      .subscribe(resp => {
        this.uiParamters_facetConfig = JSON.parse(resp.configuration).mods.search.facetConfig;
        console.log(this.uiParamters_facetConfig);
      });
    this.paramRequest = this.paramRequestService.paramRequest;
    this.dimension = this.searchRequestService.dimension;
    this.facetForm = new FormGroup({
      category: new FormControl([])
    })
  }

  isChecked(elem,id,param) {
    let check = false;
    let facetElement ={};
    facetElement[elem]=id.toString();
    if (param.query.bool.must.length > 0) {
      for (let must of param.query.bool.must){
        if (must.match){
          let mustElement =[];
          mustElement.push(must);
          if (_.filter(mustElement, ["match", facetElement]).length > 0){
            check = true;
          }
        }
        else if (must.bool){
          for (let should of must.bool.should ){
            let shouldElement =[];
            shouldElement.push(should);
            if (_.filter(shouldElement, ["match", facetElement]).length > 0) {
              check = true;
            }
          }
        } else {}
      }
    } else if (param.query.bool.must.length > 0) {}
    return check
  }

  onChangeFacet(event) {
    if (event.checked) {
      if(this.facetList.hasOwnProperty(event.source.value.split(':')[0])){
        this.facetList[event.source.value.split(':')[0]].push(event.source.value.split(':')[1])
      } else {
        this.facetList[event.source.value.split(':')[0]] = [(event.source.value.split(':')[1])]
      }
    } else {
      if(this.facetList[event.source.value.split(':')[0]].length != 1) {
        this.facetList[event.source.value.split(':')[0]] = this.facetList[event.source.value.split(':')[0]].filter(item => item !== event.source.value.split(':')[1])
      } else {
        delete this.facetList[event.source.value.split(':')[0]];
      }
    }
    this.createRequestParamFacet(this.facetList);
  }

  createRequestParamFacet(paramList){
    let request = {"must": []};
    for (let entry of Object.keys(paramList)) {
      let matchElement={"match": {}};
      if (paramList[entry].length > 1) {
        let subBoolean={"bool": {"should": []}};
        for (let criteria of paramList[entry]) {
          matchElement={"match": {}};
          matchElement["match"][entry]=criteria;
          subBoolean["bool"]["should"].push(matchElement);
        }
        request["must"].push(subBoolean);
      } else {
        matchElement["match"][entry] = paramList[entry].toString();
        request["must"].push(matchElement);
      }
    }
    this.paramRequestService.updatedSearchParam(request);
    this.searchRequestService.loadAll();
  }

  loadMoreFacetResult(groupfield,length){
    let facetElement= {};
    facetElement[groupfield]={};
    facetElement[groupfield]["terms"]={};
    facetElement[groupfield]["terms"]["field"]=groupfield;
    facetElement[groupfield]["terms"]["size"]=length + 25;
    this.uploadFacetService.updateFacet(groupfield, facetElement);
  }
}
