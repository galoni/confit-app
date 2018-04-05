import { Component, OnInit } from '@angular/core';
import { NewConfService } from "../services/newConf.service";
import { ConfSession } from "../models/confSession";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-new-conf-sessions',
  templateUrl: './new-conf-sessions.component.html',
  styleUrls: ['./new-conf-sessions.component.css']
})
export class NewConfSessionsComponent implements OnInit {
  confSessions: ConfSession[]=[];
  data:any= {};
  confId:string;
  numDays: number;

  constructor(private newConfService: NewConfService,
              private router: Router, private r:ActivatedRoute) { }

  ngOnInit() {
    this.confId = localStorage.getItem('confId');
    this.numDays = +(localStorage.getItem('confDuration'));
    if(this.numDays){
      console.log("numDays: " + this.numDays);
    }
    else{
      this.numDays = 3;
    }
  }
  counter(i: number) {
    return new Array(i);
  }
  removeSession(sess){
    const index: number = this.confSessions.indexOf(sess);
    if (index !== -1) {
      this.confSessions.splice(index, 1);
    }
  }
  createSession(form: NgForm) {
    this.data.name = form.value.name;
    this.data.session_type = form.value.session_type;
    this.data.duration = form.value.duration;
    this.data.dayNum = form.value.dayNum;
    this.data.time = form.value.time;
    this.confSessions.push(this.data);
  }
  // addManyLectures(){
  //   console.log(this.confLectures);
  //   this.newConfService.addManyLectures(this.confLectures, this.confId).then((conf) =>{
  //     console.log(conf);
  //     localStorage.setItem('lectures', JSON.stringify(this.lectures));
  //     localStorage.setItem('confLectures', JSON.stringify(this.confLectures));
  //     this.router.navigate(["../sessions"], { relativeTo: this.r });
  //   });
  // }

}
