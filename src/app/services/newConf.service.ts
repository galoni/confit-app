import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Conf } from "../models/conf";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class NewConfService {

  private base_url: String = 'http://localhost:3000/manager';

  constructor(private http: Http,  defaultOptions: RequestOptions) { }

  createConference(data): Promise<Conf> {
    let body = JSON.stringify(data);
    let headers = new Headers({ "content-type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    console.log(body);
    return this.http.post(this.base_url + '/createConference', body, options).toPromise().then((res) => res.json() as Conf);
  }
}
