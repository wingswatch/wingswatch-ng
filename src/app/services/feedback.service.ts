import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedbackFormData: Feedback;

  constructor(private http: HttpClient) { }

  submitFeedback(feedback: Feedback): Observable<Feedback> {

    const url = environment.apiBaseUrl + 'Feedback/';

    return this.http.post<Feedback>(url, feedback);

  }

  getFeedback(): Feedback {

    const feedback: Feedback = {
      name: this.feedbackFormData.name,
      email: this.feedbackFormData.email,
      message: this.feedbackFormData.message
    };

    return feedback;
  }

  setFeedBack(data: Feedback) {
    this.feedbackFormData.name = data.name;
    this.feedbackFormData.email = data.email;
    this.feedbackFormData.message = data.message;
  }

}
