import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbackFormData: Feedback = new Feedback();

  constructor(private http: HttpClient) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {

    const url = 'api/Feedback/';

    return this.http.post<Feedback>(url, feedback);

  }

  getFeedback(): Feedback {
    const feedback = {
      Name: this.feedbackFormData.Name,
      Email: this.feedbackFormData.Email,
      Message: this.feedbackFormData.Message
    }

    return feedback;
  }

  setFeedBack(data: Feedback) {
    this.feedbackFormData.Name = data.Name;
    this.feedbackFormData.Email = data.Email;
    this.feedbackFormData.Message = data.Message;
  }

}
