import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ParamRequestService {
  private _paramRequest = new BehaviorSubject<any[]>([]);
  private paramRequestStore: { paramRequest: any[] } = { paramRequest: [] };
  readonly paramRequest = this._paramRequest.asObservable();
  param:object= {
    "from": 0,
    "size": 20,
    "sort": ["_score"],
    "query": {
      "bool": {"must": []}
    },
    "aggregations": {
      "thesaurus_geonetworkthesaurusexternalthemegemet_tree": {
        "terms": {
          "field": "thesaurus_geonetworkthesaurusexternalthemegemet_tree",
          "size": 100,
          "order": {
            "_key": "asc"
          }
        }
      },
      "thesaurus_geonetworkthesaurusexternalplaceregions_tree": {
        "terms": {
          "field": "thesaurus_geonetworkthesaurusexternalplaceregions_tree",
          "size": 100,
          "order": {
            "_key": "asc"
          }
        }
      },
      "resourceType": {
        "terms": {
          "field": "resourceType"
        },
        "aggs": {
          "format": {
            "terms": {
              "field": "format"
            }
          }
        }
      },
      "availableInServices": {
        "filters": {
          "filters": {
            "availableInViewService": {
              "query_string": {
                "query": "+linkProtocol:/OGC:WMS.*/"
              }
            },
            "availableInDownloadService": {
              "query_string": {
                "query": "+linkProtocol:/OGC:WFS.*/"
              }
            }
          }
        }
      },
      "codelist_spatialRepresentationType": {
        "terms": {
          "field": "codelist_spatialRepresentationType",
          "size": 10
        }
      },
      "creationYearForResource": {
        "terms": {
          "field": "creationYearForResource",
          "size": 5
        }
      },
      "tag": {
        "terms": {
          "field": "tag",
          "size": 15
        }
      },
      "dateStamp": {
        "auto_date_histogram": {
          "field": "dateStamp",
          "buckets": 50
        }
      }
    },
    "_source": {
      "includes": [
        "uuid",
        "id",
        "creat*",
        "group*",
        "logo",
        "category",
        "topicCat",
        "inspire*",
        "resource*",
        "draft",
        "overview.*",
        "owner*",
        "link*",
        "image*",
        "status*",
        "rating",
        "tag*",
        "geom",
        "isTemplate",
        "valid",
        "isHarvested",
        "documentStandard"
      ]
    }
  };

  constructor() { }

  updatedSearchText(queryParam){
    this.paramRequest.subscribe((data: {}) => {
      if (data[0].query.bool.must){
        let index =_.findIndex(data[0].query.bool.must, 'query_string');
        if ( index === -1){
          data[0].query.bool.must.push(queryParam)
        } else{
          data[0].query.bool.must[index]['query_string']=queryParam['query_string']
        }
      }
    })
  }

  searchTextRemove(){
    this.paramRequest.subscribe((data: {}) => {
      if (data[0].query.bool.must){
        _.remove(data[0].query.bool.must, function(n) {
          return n.hasOwnProperty('query_string');
        });
      }
    })
  }

  searchReset(){
    this.paramRequest.subscribe((data: {}) => {
      if (data[0].query.bool.must){
        _.remove(data[0].query.bool.must, function(n) {
          return n.hasOwnProperty('query_string');
        });
        _.remove(data[0].query.bool.must, function(n) {
          return n.hasOwnProperty('match');
        });
        _.remove(data[0].query.bool.must, function(n) {
          return n.hasOwnProperty('bool');
        });
      }
    })
  }

  updatedSearchParam(queryParam){
    this.paramRequest.subscribe((data: {}) => {
      if (data[0].query.bool.must){
        _.remove(data[0].query.bool.must, function(n) {
          return n.hasOwnProperty('match');
        });
        _.remove(data[0].query.bool.must, function(n) {
          return n.hasOwnProperty('bool');
        });
        for (let element of queryParam.must) {
          let index =_.findIndex(data[0].query.bool.must, element);
          if ( index === -1){
            data[0].query.bool.must.push(element)
          } else{}
        }
      }
    })
  }

  updatedSearchIndex(from){
    this.paramRequest.subscribe((data: {}) => {
      console.log(data[0]);
      data[0]['from']=from * data[0]['size'];
    })
  }

  updatedSearchSize(index){
    this.paramRequest.subscribe((data: {}) => {
      data[0]['size']=index;
    })
  }

  getParams() {
    this.paramRequestStore.paramRequest = [];
    this.paramRequestStore.paramRequest.push(this.param);
    this._paramRequest.next(Object.assign({}, this.paramRequestStore).paramRequest);
  }
}
