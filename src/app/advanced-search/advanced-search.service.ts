import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AdvancedSearch, AdvancedSearchResult } from './advanced-search.interfaces';

@Injectable({
  providedIn: 'root'
})
export class AdvancedSearchService {

  constructor(private httpClient: HttpClient) { }

  advancedSearch(search: AdvancedSearch): Observable<AdvancedSearchResult[]> {

    const url = `${environment.apiBaseUrl}Search`;

    return this.httpClient.post<AdvancedSearchResult[]>(url, search);

  }
}
