import {EventEmitter, Injectable} from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Conf } from '../models/conf';
import { Lecture } from '../models/lecture';
import { ConfSession } from '../models/confSession';
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class NewConfService {
  private _newConf = new BehaviorSubject<Conf>(new Conf('new conf', 'type', 'logo', 'date', 2, 'loc', 'aud', []));
  newConf$ = this._newConf.asObservable();
  newConf = new EventEmitter<Conf>();
  confProgram = new EventEmitter<any>();
  headers = new Headers({ 'content-type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });
  // private base_url: String = 'https://confit-backend.herokuapp.com/manager';
  private base_url: String = 'http://localhost:3000/manager';
  constructor(private http: Http,  defaultOptions: RequestOptions) { }

  setNewConf(conf) {
    this._newConf.next(conf);
  }

  createConference(data): Promise<Conf> {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(this.base_url + '/createConference', body, this.options).toPromise().then((res) => res.json() as Conf);
  }

  getAllLectures(): Promise<Lecture[]> {
    return this.http.post(this.base_url + '/getAllLectures', {}, this.options).toPromise().then((res) => res.json() as Lecture[]);
  }

  getAllLecturesByTopic(topics): Promise<Lecture[]> {
    return this.http.post(this.base_url + '/getAllLecturesByTopic', {'main_topics': topics}, this.options)
      .toPromise().then((res) => res.json() as Lecture[]);
  }

  createLecture(data): Promise<Lecture> {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(this.base_url + '/createLecture', body, this.options).toPromise().then((res) => res.json() as Lecture);
  }

  addManyLectures(data, confId, confTopics): Promise<Conf> {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(this.base_url + '/addManyLectures', {'confId': confId, 'confLectures': data, 'confTopics': confTopics},
      this.options).toPromise().then((res) => res.json() as Conf);
  }

  createProgram(data, confId): Promise<Conf> {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(this.base_url + '/createProgram', {'confId': confId, 'confSessions': data}, this.options)
      .toPromise().then((res) => res.json() as Conf);
  }

  buildProgram(confId): Promise<ConfSession[]> {
    return this.http.post(this.base_url + '/buildProgram', {'confId': confId}, this.options)
      .toPromise().then((res) => res.json() as ConfSession[]);
  }

  getConfById(confId): Promise<Conf> {
    return this.http.post(this.base_url + '/getConfById', {'confId': confId}, this.options)
      .toPromise().then((res) => res.json() as Conf);
  }
}
