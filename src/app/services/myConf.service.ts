import {EventEmitter, Injectable} from '@angular/core';
import { Response,Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Visitor } from "../models/visitor";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class myConfService {
  headers = new Headers({ "content-type": "application/json" });
  options = new RequestOptions({ headers: this.headers });
  private manager_url: String = 'http://localhost:3000/manager';
  private visitor_url: String = 'http://localhost:3000/visitor';
  visitorSelected = new EventEmitter<any>();
  constructor(private http: Http,  defaultOptions: RequestOptions) { }

  getVisitorById(visitorId): Promise<Visitor> {
    return this.http.post(this.visitor_url + '/getVisitorById', {id: visitorId}, this.options).toPromise().then((res) => res.json() as Visitor);
  }
}
  // registerToConf(data, callback: Function){
  // console.log("inside registrt in service");
  //   let body=JSON.stringify(data) ;
  //   console.log(body)
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: this.headers });
  //   this.http.post(this.visitor_url +'/registerToConf', body, options)
  //     .subscribe((response: Response)=> {
  //       let obj = response.json();
  //       if(!obj.error) {
  //         callback(obj);
  //       }else{
  //         callback('error');
  //       }
  //     });
  // }
