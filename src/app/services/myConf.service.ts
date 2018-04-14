import {EventEmitter, Injectable} from '@angular/core';
import { Response,Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Visitor } from "../models/visitor";
import { Lecture } from "../models/lecture";
import { Conf } from "../models/conf";
import 'rxjs/add/operator/toPromise';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';


@Injectable()
export class myConfService {
  headers = new Headers({ "content-type": "application/json" });
  options = new RequestOptions({ headers: this.headers });
  private manager_url: String = 'http://localhost:3000/manager';
  private visitor_url: String = 'http://localhost:3000/visitor';
  visitorSelected = new EventEmitter<Visitor>();

  private _lecture = new BehaviorSubject<Lecture>(new Lecture("new lec", "lecname", "desc", 0, "topic"));
  _visitor = new BehaviorSubject<Visitor>(new Visitor("linkedin", "edu", "ocu", "qrcode"));
  _Conf = new BehaviorSubject<Conf>(new Conf("new conf", "type", "logo", "date", 2, "loc", "aud", []));
  _confId = new BehaviorSubject<string>('');
  _qrcode = new BehaviorSubject<any>({
  type:'',
  id:'',
  data:''
});

confId$ = this._confId.asObservable();

  lecture$ = this._lecture.asObservable();
  visitor$ = this._visitor.asObservable();
  // Conf$ = this._Conf.asObservable();
  qrcode$ = this._qrcode.asObservable();


  constructor(private http: Http,  defaultOptions: RequestOptions) { }


  // setLecture(lecture) {
  //   this._lecture.next(lecture);
  // }
  setConfId(confId) {
    this._confId.next(confId);
  }
  setVisitor(visitor) {
    this._lecture.next(visitor);
  }
  setConf(conf) {
    this._Conf.next(conf);
  }
  setQRCode(qrcode) {
    this._qrcode.next(qrcode);
  }
  
  lectureInConf(visitor,confId, lecId){
    if (visitor.confs.some(x => x.confId === confId)){
      console.log("lecture found in conf " + confId)
      return true;
      }
    else{
      console.log("did not find in conf " + confId);
      return false;
    }

  }

  getVisitorById(visitorId): Promise<Visitor> {
    return this.http.post(this.visitor_url + '/getVisitorById', {id: visitorId}, this.options).toPromise().then((res) => res.json() as Visitor);
  }
  appendPrefferedLecture(visitorid, confid,lectureid): Promise<boolean> {
    return this.http.post(this.visitor_url + '/appendPrefferedLecture', {visitorid: visitorid, confid: confid, lecture: lectureid}, this.options).toPromise().then((res) => res.json() as boolean);
  }
  appendTopic(visitorid, confid,topic): Promise<boolean> {
    return this.http.post(this.visitor_url + '/appendTopic', {visitorid: visitorid, confid: confid, topic: topic}, this.options).toPromise().then((res) => res.json());
  }
  buildPath(visitorid, confid): Promise<any> {
    return this.http.post(this.visitor_url + '/buildPath', {visitorId: visitorid, confId: confid}, this.options).toPromise().then((res) => res.json());
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
