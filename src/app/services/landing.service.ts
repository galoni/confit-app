import {EventEmitter, Injectable} from '@angular/core';
import { Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Conf } from '../models/conf';
import { Manager } from '../models/manager';
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class LandingService {
  private _selectedConf = new BehaviorSubject<Conf>(new Conf('new conf', 'type', 'logo', 'date', 2, 'loc', 'aud', []));
  selectedConf$ = this._selectedConf.asObservable();

  headers = new Headers({ 'content-type': 'application/json' });
  options = new RequestOptions({ headers: this.headers });
  private base_url: String = 'https://confit-backend.herokuapp.com/manager';
  constructor(private http: Http,  defaultOptions: RequestOptions) { }

  setSelectedConf(conf) {
    this._selectedConf.next(conf);
    console.log('$selectedConf: ' + conf.name);
  }

  getAllConfById(managerId): Promise<Conf[]> {
    return this.http.post(this.base_url + '/getAllConfById', {'managerId': managerId}, this.options)
      .toPromise().then((res) => res.json() as Conf[]);
  }

}
