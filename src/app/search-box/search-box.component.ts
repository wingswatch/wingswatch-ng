import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent {

  constructor(private searchService: SearchService, private router: Router) { }

  clickSearch() {
    const searchTerms  = (document.getElementById('search_term') as HTMLInputElement).value;
    this.searchService.broadcastSearchTerm(searchTerms);
    this.router.navigate(['/events']);
  }

}
