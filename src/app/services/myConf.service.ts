import { EventEmitter, Injectable } from '@angular/core';
import { Response, Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import { Visitor } from "../models/visitor";
import { Lecture } from "../models/lecture";
import { Conf } from "../models/conf";
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Manager } from '../models/manager';


@Injectable()
export class myConfService {
  headers = new Headers({ "content-type": "application/json" });
  options = new RequestOptions({ headers: this.headers });
  private manager_url: String = 'https://confit-backend.herokuapp.com/manager';
  private visitor_url: String = 'https://confit-backend.herokuapp.com/visitor';
  // private visitor_url: String = 'http://localhost:3000/visitor';
  // private manager_url: String = 'http://localhost:3000/manager';


  visitorSelected = new EventEmitter<Visitor>();

  _lecture = new BehaviorSubject<Lecture>(new Lecture("new lec", "lecname", "desc", 0, "topic", ""));
  _visitor = new BehaviorSubject<Visitor>(new Visitor("linkedin", "edu", "ocu", "qrcode"));
  _Conf = new BehaviorSubject<Conf>(new Conf("new conf", "type", "logo", "date", 2, "loc", "aud", []));
  _confId = new BehaviorSubject<string>('');
  _qrcode = new BehaviorSubject<any>({
    type: '',
    id: '',
    data: ''
  });
  _qrcode_visitor = new BehaviorSubject<any>({
    type: '',
    id: '',
    data: ''
  });
  _qrcode_lecture = new BehaviorSubject<any>({
    type: '',
    id: '',
    data: ''
  });
  _qrcode_conf = new BehaviorSubject<any>({
    type: '',
    id: '',
    data: ''
  });

  confId$ = this._confId.asObservable();

  lecture$ = this._lecture.asObservable();
  visitor$ = this._visitor.asObservable();
  // Conf$ = this._Conf.asObservable();
  qrcode$ = this._qrcode.asObservable();
  _qrcode_conf$ = this._qrcode_conf.asObservable();
  _qrcode_visitor$ = this._qrcode_visitor.asObservable();
  _qrcode_lecture$ = this._qrcode_lecture.asObservable();

  constructor(private http: Http, defaultOptions: RequestOptions) { }


  // setLecture(lecture) {
  //   this._lecture.next(lecture);
  // }
  setConfId(confId) {
    this._confId.next(confId);
  }
  setVisitor(visitor) {
    this._visitor.next(visitor);
  }
  setConf(conf) {
    this._Conf.next(conf);
  }
  setQRCode(qrcode) {
    //console.log("service qrcode:"+JSON.stringify(qrcode));
    this._qrcode.next(qrcode);
  }
  setQRCode_visitor(qrcode) {
    //console.log("service qrcode:"+JSON.stringify(qrcode));
    this._qrcode_visitor.next(qrcode);
  }
  setQRCode_conf(qrcode) {
    //console.log("service qrcode:"+JSON.stringify(qrcode));
    this._qrcode_conf.next(qrcode);
  }
  setQRCode_lecture(qrcode) {
    //console.log("service qrcode:"+JSON.stringify(qrcode));
    this._qrcode_lecture.next(qrcode);
  }

  lectureInConf(visitor, confId, lecId, cb) {
    console.log("enternig lectureInConf");
    console.log("VISITOR:");
    console.log(visitor);
    console.log("CONFID:");
    console.log(confId);
    console.log("LECID:");
    console.log(lecId);
    visitor.confs.forEach(x => {
      if (x.confId === confId) {
        cb(x.custome_path[0].session_list.some(sess => {
          return sess.session.lectures.some(lct => lct._id === lecId)
        }))
      }
    })

    // if (visitor.confs.some(x => x.confId === confId)) {
    //   console.log("lecture found in conf " + confId)
    //   cb(true)
    // }
    // else {
    //   console.log("did not find in conf " + confId);
    //   cb(false)
    // }
  }

  getVisitorById(visitorId): Promise<Visitor> {
    return this.http.post(this.visitor_url + '/getVisitorById', { id: visitorId }, this.options).toPromise().then((res) => res.json() as Visitor);
  }
  appendPrefferedLecture(visitorid, confid, lectureid): Promise<boolean> {
    return this.http.post(this.visitor_url + '/appendPrefferedLecture', { visitorid: visitorid, confid: confid, lecture: lectureid }, this.options).toPromise().then((res) => res.json() as boolean);
  }
  appendTopic(visitorid, confid, topic): Promise<boolean> {
    return this.http.post(this.visitor_url + '/appendTopic', { visitorid: visitorid, confid: confid, topic: topic }, this.options).toPromise().then((res) => res.json());
  }
  buildPath(visitorid, confid): Promise<any> {
    return this.http.post(this.visitor_url + '/buildPath', { visitorId: visitorid, confId: confid }, this.options).toPromise().then((res) => res.json());
  }
  getLectureById(lectureId): Promise<Lecture> {
    return this.http.post(this.manager_url + '/getLectureById', { lectureId: lectureId }, this.options).toPromise().then((res) => res.json() as Lecture);
  }
  getConfById(confId): Promise<Conf> {
    return this.http.post(this.manager_url + '/getConfById', { confId: confId }, this.options).toPromise().then((res) => res.json() as Conf);
  }
  rateLecture(data): Promise<Lecture> {
    const body = JSON.stringify(data);
    console.log(body);
    return this.http.post(this.manager_url + '/addTotalRating', body, this.options).toPromise().then((res) => res.json() as Lecture);
  }

  matching(data, callback: Function) {
    console.log("inside matchingPercent in service");
    let body = JSON.stringify(data);
    console.log(body)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: this.headers });
    this.http.post(this.visitor_url + '/matching', body, options)
      .subscribe((response: Response) => {
        let obj = response.json();
        if (!obj.error) {
          callback(obj);
        } else {
          callback('error');
        }
      });
  }

  matchingPercent(profilePie1, profilePie2): number {
    var min = Math.min(profilePie1, profilePie2);
    var max = Math.max(profilePie1, profilePie2);
    return min / max;
  }
}
