import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { Feedback } from '../models/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  feedback: Feedback;
  public feedbackSubmitted: boolean;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.feedback = this.feedbackService.getFeedback();
  }

  submitContactInfo() {
    this.feedbackSubmitted = true;
    this.feedbackService.setFeedBack(this.feedback);

    // Call the Feedback Service to send to back-end API
    this.feedbackService
      .submitFeedback(this.feedback)
      .subscribe(
        result => console.log(result),
        error => console.error(error));
  }
}
