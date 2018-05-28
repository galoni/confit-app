import {EventEmitter, Injectable} from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Conf } from '../models/conf';
import { Visitor } from '../models/visitor';
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class VisitorService {
  headers = new Headers({ 'content-type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });
  // private base_url: String = 'https://confit-backend.herokuapp.com/manager';
  private base_url: String = 'http://localhost:3000/visitor';
  constructor(private http: Http,  defaultOptions: RequestOptions) { }

  createVisitor(data): Promise<Visitor> {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(this.base_url + '/createVisitor', body, this.options).toPromise().then((res) => res.json() as Visitor);
  }

  login(data): Promise<Visitor> {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(this.base_url + '/login', body, this.options).toPromise().then((res) => res.json() as Visitor);
  }
  //
  // getManagerById(managerId): Promise<Manager> {
  //   return this.http.post(this.base_url + '/getManagerById', {'managerId': managerId}, this.options)
  //     .toPromise().then((res) => res.json() as Manager);
  // }
  //
  // getAllConfById(managerId): Promise<Conf[]> {
  //   return this.http.post(this.base_url + '/getAllConfById', {'managerId': managerId}, this.options)
  //     .toPromise().then((res) => res.json() as Conf[]);
  // }
}
