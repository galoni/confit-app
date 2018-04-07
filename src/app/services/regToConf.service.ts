import {EventEmitter, Injectable} from '@angular/core';
import { Response,Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Conf } from "../models/conf";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class RegToConfService {
  headers = new Headers({ "content-type": "application/json" });
  options = new RequestOptions({ headers: this.headers });
  private manager_url: String = 'http://localhost:3000/manager';
  private visitor_url: String = 'http://localhost:3000/visitor';

  constructor(private http: Http,  defaultOptions: RequestOptions) { }

  getAllConfs(): Promise<Conf[]> {
    return this.http.post(this.manager_url + '/getAllConfs', {}, this.options).toPromise().then((res) => res.json() as Conf[]);
  }
  
  registerToConf(data, callback: Function){
  console.log("inside registrt in service");
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
  
  
}
