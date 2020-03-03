import { Component, OnInit } from '@angular/core';
import { SearchRequestService } from '../search-request.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-resultview',
  templateUrl: './resultview.component.html',
  styleUrls: ['./resultview.component.scss']
})

export class ResultviewComponent implements OnInit {
  metadata: Observable<any[]>;
  selected = [];
  constructor(private searchRequestService: SearchRequestService) { }

  ngOnInit() {
    this.metadata = this.searchRequestService.metadata;
    this.searchRequestService.loadAll();
  }

  checked(item){
    if(this.selected.indexOf(item) != -1){
      return true;
    }
  }

  // when checkbox change, add/remove the item from the array
  onChange(checked, item){
    if(checked){
      this.selected.push(item);
    } else {
      this.selected.splice(this.selected.indexOf(item), 1)
    }
  }

  selectAll(){
    //TO DO selectALL

  }

  selectAllInPage(){
    //TO DO selectALL
  }

  unselectAll(){
    //TO DO unselectAll
  }
}
