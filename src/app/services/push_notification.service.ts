import {EventEmitter, Injectable} from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Push_Notification } from '../models/push_notification';
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class Push_NotificationService {
  headers = new Headers({ 'content-type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });
  private base_url: String = 'https://confit-backend.herokuapp.com/push';
  // private base_url: String = 'http://localhost:3000/push';
  constructor(private http: Http,  defaultOptions: RequestOptions) { }


  getMessagesByTopic(topic): Promise<Push_Notification> {
    return this.http.post(this.base_url + '/getMessagesByTopic', {'topic': topic}, this.options)
      .toPromise().then((res) => res.json() as Push_Notification);
  }
  subscribeToTopic(tokens, topic): Promise<any> {
    return this.http.post(this.base_url + '/subscribeToTopic', {'tokens': tokens,'topic': topic}, this.options)
      .toPromise().then((res) => res.json());
  }
  unsubscribeFromTopic(tokens, topic): Promise<any> {
    return this.http.post(this.base_url + '/unsubscribeFromTopic', {'tokens': tokens,'topic': topic}, this.options)
      .toPromise().then((res) => res.json());
  }
}
