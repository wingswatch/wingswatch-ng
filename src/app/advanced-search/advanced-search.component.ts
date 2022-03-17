import { Component, OnInit } from '@angular/core';
import { AdvancedSearch, AdvancedSearchResult } from './advanced-search.interfaces';
import { AdvancedSearchService } from './advanced-search.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  loading: boolean;
  model: AdvancedSearch = {};
  results: AdvancedSearchResult[];

  constructor(private service: AdvancedSearchService) { }

  ngOnInit(): void {
  }

  clickSearch(): void {

    this.loading = true;

    this.service.advancedSearch(this.model).subscribe(r => {
      this.results = r;
      this.loading = false;
    });

  }

}
