import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {SearchRequestService} from "../../services/search-request.service";

@Component({
  selector: 'app-quick-result',
  templateUrl: './quick-result.component.html',
  styleUrls: ['./quick-result.component.scss']
})
export class QuickResultComponent implements OnInit {
  metadata: Observable<any[]>;
  //TODO add search settings of the home page in the ui settings
  searchButton = [{
    "name":"MostRecent",
    "sort":[{changeDate: "asc"}, "_score"],
    "size":"12"
  },{
    "name":"MostPopular",
    "sort":[{popularity: "asc"}, "_score"],
    "size":"12"
  }
  ];


  constructor(
    private searchRequestService: SearchRequestService
  ) { }

  ngOnInit() {
    this.metadata = this.searchRequestService.metadata;
    this.searchRequestService.loadQuickResult(this.searchButton[0].sort,this.searchButton[0].size)
  }

  changeResult(sort,size){
    console.log(sort);
    console.log(size);
    this.searchRequestService.loadQuickResult(sort,size)
  }
}
