import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Log } from '../models/log';

@Component({
  selector: 'app-read-logs',
  templateUrl: './read-logs.component.html',
  styleUrls: ['./read-logs.component.scss']
})
export class ReadLogsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient) { }

  private sub$: Subscription;
  private secretId: string;
  public logs: Log[];

  ngOnInit(): void {

    this.sub$ = this.route.params.subscribe((params: Params) => {

      // Get our event ID from the URL
      this.secretId = params['secretId'];

      this.getLogs();

    });

  }

  getLogs() {
    return this.http.get<Log[]>('api/Logging/GetLogs/' + this.secretId).subscribe(
      result => this.logs = result,
      error => console.error(error)
    );
  }

}
