import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import {AngularMaterialModule} from "../material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FlexLayoutModule} from "@angular/flex-layout";
import {PaginationComponent} from "./components/pagination/pagination.component";
import {SearchBoxComponent} from "./components/search-box/search-box.component";
import {SortBoxComponent} from "./components/sort-box/sort-box.component";
import {ResultviewComponent} from "./components/resultview/resultview.component";
import {SearchComponent} from "./search/search.component";
import {FacetsComponent} from "./components/facets/facets.component";
import {HomeComponent} from "./home/home.component";
import { QuickResultComponent } from './components/quick-result/quick-result.component';


@NgModule({
  declarations: [
    SearchComponent,
    HomeComponent,
    FacetsComponent,
    ResultviewComponent,
    SearchBoxComponent,
    PaginationComponent,
    SortBoxComponent,
    QuickResultComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularMaterialModule,
    SearchRoutingModule
  ]
})
export class SearchModule { }
