import {EventEmitter, Injectable} from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Conf } from '../models/conf';
import { Manager } from '../models/manager';
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ManagerService {

  headers = new Headers({ 'content-type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });
  // private base_url: String = 'https://confit-backend.herokuapp.com/manager';
  private base_url: String = 'http://localhost:3000/manager';
  constructor(private http: Http,  defaultOptions: RequestOptions) { }

  createManager(data): Promise<Manager> {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(this.base_url + '/createManager', body, this.options).toPromise().then((res) => res.json() as Manager);
  }

  getManagerById(managerId): Promise<Manager> {
    return this.http.post(this.base_url + '/getManagerById', {'managerId': managerId}, this.options)
      .toPromise().then((res) => res.json() as Manager);
  }

  getAllConfById(managerId): Promise<Conf[]> {
    return this.http.post(this.base_url + '/getAllConfById', {'managerId': managerId}, this.options)
      .toPromise().then((res) => res.json() as Conf[]);
  }
}
