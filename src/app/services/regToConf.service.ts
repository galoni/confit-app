import {EventEmitter, Injectable} from '@angular/core';
import { Response,Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Conf } from "../models/conf";
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class RegToConfService {
  private _RegConf = new BehaviorSubject<Conf>(new Conf('new conf', 'type', 'logo', 'date', 2, 'loc', 'aud', []));
  headers = new Headers({ "content-type": "application/json" });
  options = new RequestOptions({ headers: this.headers });
  RegConf$ = this._RegConf.asObservable();
  RegConf = new EventEmitter<Conf>();
  private manager_url: String = 'https://confit-backend.herokuapp.com/manager';
  private visitor_url: String = 'https://confit-backend.herokuapp.com/visitor';

  constructor(private http: Http,  defaultOptions: RequestOptions) { }

  setRegConf(conf) {
    this._RegConf.next(conf);
  }

  getAllConfs(): Promise<Conf[]> {
    return this.http.post(this.manager_url + '/getAllConfs', {}, this.options).toPromise().then((res) => res.json() as Conf[]);
  }

  registerToConf(data, callback: Function){
  console.log("inside register in service");
    let body=JSON.stringify(data) ;
    console.log(body)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: this.headers });
    this.http.post(this.visitor_url +'/registerToConf', body, options)
      .subscribe((response: Response)=> {
        let obj = response.json();
        if(!obj.error) {
          callback(obj);
        }else{
          callback('error');
        }
      });
  }

  updatePercent(data, callback: Function){
  console.log("inside updatePercent in service");
    let body=JSON.stringify(data) ;
    console.log(body)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: this.headers });
    this.http.post(this.visitor_url +'/updatePercent', body, options)
      .subscribe((response: Response)=> {
        let obj = response.json();
        if(!obj.error) {
          callback(obj);
        }else{
          callback('error');
        }
      });
  }

  addLectures(data, callback: Function){
  console.log("inside addLectures in service");
    let body=JSON.stringify(data) ;
    console.log(body)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: this.headers });
    this.http.post(this.visitor_url +'/updatePreffered_lectures', body, options)
      .subscribe((response: Response)=> {
        let obj = response.json();
        if(!obj.error) {
          callback(obj);
        }else{
          callback('error');
        }
      });
  }

    setTopics(data, callback: Function){
  console.log("inside setTopics in service");
    let body=JSON.stringify(data) ;
    console.log(body)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: this.headers });
    this.http.post(this.visitor_url +'/setTopics', body, options)
      .subscribe((response: Response)=> {
        let obj = response.json();
        if(!obj.error) {
          callback(obj);
        }else{
          callback('error');
        }
      });
  }

}
