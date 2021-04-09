import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  public currentSearchTerm$ = new BehaviorSubject('');

  constructor() { }

  broadcastSearchTerm(searchTerms: string) {
     this.currentSearchTerm$.next(searchTerms);
  }

}
