import { Component, OnInit } from '@angular/core';
import { Feedback } from '../models/feedback';
import { HttpClient } from '@angular/common/http';
import { Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-read-comments',
  templateUrl: './read-comments.component.html',
  styleUrls: ['./read-comments.component.scss']
})
export class ReadCommentsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient) { }

  private sub$: Subscription;

  ngOnInit() {

    this.sub$ = this.route.params.subscribe((params: Params) => {

      // Get our event ID from the URL
      this.secretId = params['secretId'];

      this.getFeedback();

    });

  }

  private secretId: string;
  public feedback: Feedback[];

  getFeedback() {
    return this.http.get<Feedback[]>('api/Feedback/GetFeedback/' + this.secretId).subscribe(
      result => this.feedback = result,
      error => console.error(error)
    );
  }

}
