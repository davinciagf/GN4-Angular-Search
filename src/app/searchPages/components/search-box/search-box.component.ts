import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { ParamRequestService } from '../../services/param-request.service';
import { SearchRequestService } from "../../services/search-request.service";

export class searchElement {
  constructor(
    public anyText: string,
  ) {  }
}

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})

export class SearchBoxComponent implements OnInit {
  searchBox: FormGroup;

  constructor(private searchRequestService: SearchRequestService,
              private paramRequestService: ParamRequestService) { }

  ngOnInit() {
    this.searchBox = new FormGroup({
      anyText: new FormControl('')
    });
  }

  search(model: searchElement) {
    if (model.anyText != '' && model.anyText != null){
      let queryString={};
      queryString['query_string']={};
      queryString['query_string']['query']=model.anyText;
      this.paramRequestService.updatedSearchText(queryString);
      this.searchRequestService.loadAll();
    }
    else {
      this.searchTextRemove();
    }
  }

  searchTextRemove() {
    this.searchBox.reset();
    this.paramRequestService.searchTextRemove();
    this.searchRequestService.loadAll();
  }

  searchReset(){
    this.searchBox.reset();
    this.paramRequestService.searchReset();
    this.searchRequestService.loadAll();
  }
}
