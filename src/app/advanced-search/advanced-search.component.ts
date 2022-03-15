import { Component, OnInit } from '@angular/core';
import { AdvancedSearch, AdvancedSearchResult } from './advanced-search.interfaces';
import { AdvancedSearchService } from './advanced-search.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  model: AdvancedSearch = {};
  results: AdvancedSearchResult[] | undefined;

  constructor(private service: AdvancedSearchService) { }

  ngOnInit(): void {
  }

  clickSearch(): void {

    this.service.advancedSearch(this.model).subscribe(r => this.results = r);

  }

}
