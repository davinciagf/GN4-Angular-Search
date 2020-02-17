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

  constructor(private searchRequestService: SearchRequestService) { }

  ngOnInit() {
    this.metadata = this.searchRequestService.metadata;
    this.searchRequestService.loadAll();
  }
}
