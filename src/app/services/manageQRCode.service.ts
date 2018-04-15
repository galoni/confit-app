import {EventEmitter, Injectable} from '@angular/core';
import { Response,Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Conf } from "../models/conf";
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()
export class ManageQRCodeService {
  headers = new Headers({ "content-type": "application/json" });
  options = new RequestOptions({ headers: this.headers });
  private manager_url: String = 'http://localhost:3000/manager';
  private visitor_url: String = 'http://localhost:3000/visitor';
  private qrcode_url: String = 'http://localhost:3000/qrcodeApi';
  _Conf = new BehaviorSubject<Conf>(new Conf("new conf", "type", "logo", "date", 2, "loc", "aud", []));
  Conf$ = this._Conf.asObservable();


  constructor(private http: Http,  defaultOptions: RequestOptions) { }

  setConf(conf) {
    this._Conf.next(conf);
  }

  getAllConfs(): Promise<Conf[]> {
    return this.http.post(this.manager_url + '/getAllConfs', {}, this.options).toPromise().then((res) => res.json() as Conf[]);
  }
  getConfById(confId): Promise<Conf> {
    return this.http.post(this.manager_url + '/getConfById', {confId: confId}, this.options).toPromise().then((res) => res.json() as Conf);
  }
  get_multiple_images(confId): Promise<any> {
    return this.http.post(this.qrcode_url + '/get_multiple_images', {confId: confId}, this.options).toPromise().then((res) => res.json());
  }

}
