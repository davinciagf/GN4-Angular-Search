import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UiParamService {
  baseUrl:string = 'geonetwork/srv/api/0.1/ui/srv';

  constructor(private http: HttpClient) { }

  getUIParam (): Observable<any> {
    return this.http.get<any[]>(this.baseUrl)
  }
}

