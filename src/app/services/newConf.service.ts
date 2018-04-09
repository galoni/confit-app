import {EventEmitter, Injectable} from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Conf } from "../models/conf";
import { Lecture } from "../models/lecture";
import { ConfSession } from "../models/confSession";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NewConfService {
  newConf = new EventEmitter<Conf>();
  headers = new Headers({ "content-type": "application/json" });
  options = new RequestOptions({ headers: this.headers });
  private base_url: String = 'http://localhost:3000/manager';

  constructor(private http: Http,  defaultOptions: RequestOptions) { }

  createConference(data): Promise<Conf> {
    let body = JSON.stringify(data);
    console.log(body);
    return this.http.post(this.base_url + '/createConference', body, this.options).toPromise().then((res) => res.json() as Conf);
  }

  getAllLectures(): Promise<Lecture[]> {
    return this.http.post(this.base_url + '/getAllLectures', {}, this.options).toPromise().then((res) => res.json() as Lecture[]);
  }

  createLecture(data): Promise<Lecture> {
    let body = JSON.stringify(data);
    console.log(body);
    return this.http.post(this.base_url + '/createLecture', body, this.options).toPromise().then((res) => res.json() as Lecture);
  }

  addManyLectures(data, confId): Promise<Conf> {
    let body = JSON.stringify(data);
    console.log(body);
    return this.http.post(this.base_url + '/addManyLectures', {'confId':confId, 'confLectures':data}, this.options).toPromise().then((res) => res.json() as Conf);
  }

  createProgram(data, confId): Promise<Conf> {
    let body = JSON.stringify(data);
    console.log(body);
    return this.http.post(this.base_url + '/createProgram', {'confId':confId, 'confSessions':data}, this.options).toPromise().then((res) => res.json() as Conf);
  }

  buildProgram(confId): Promise<ConfSession[]> {
    return this.http.post(this.base_url + '/buildProgram', {'confId':confId}, this.options).toPromise().then((res) => res.json() as ConfSession[]);
  }
}
