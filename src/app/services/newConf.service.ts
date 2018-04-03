import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Conf } from "../models/conf";
import { Lecture } from "../models/lecture";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NewConfService {
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
}
