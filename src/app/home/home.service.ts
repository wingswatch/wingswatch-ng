import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private httpClient: HttpClient) { }

  public ping(): Observable<string> {
    const url = `${environment.apiBaseUrl}events/ping`;
    return this.httpClient.get<string>(url);
  }

}
