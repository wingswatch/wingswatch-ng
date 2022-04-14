import { Component, OnInit } from '@angular/core';
import { MetaService } from '../services/meta.service';
import { AdvancedSearch, AdvancedSearchResult } from './advanced-search.interfaces';
import { AdvancedSearchService } from './advanced-search.service';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  loading: boolean;
  showSearch = true;
  model: AdvancedSearch = {};
  results: AdvancedSearchResult[] | undefined;

  constructor(private service: AdvancedSearchService, private metaService: MetaService) { }

  ngOnInit(): void {
    this.metaService.updateTitle('Advanced Search');
  }

  clickSearch(): void {

    this.showSearch = false;
    this.loading = true;

    this.service.advancedSearch(this.model).subscribe(r => {
      this.results = r;
      this.loading = false;
    });

  }

}
