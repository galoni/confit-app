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
  confSessions: ConfSession[][]=[];
  data:any= {};
  confId:string;
  numDays: number;
  timeTable: number[] = [];
  selectedDay:number;
  startTime: number= 9;

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
    for(let i=0; i< this.numDays; i++){
      this.timeTable[i] = this.startTime;
      this.confSessions[i] = [];
    }
  }
  onChange(day){
    console.log("day: " + day);
    this.selectedDay = day;
  }
  counter(i: number) {
    return new Array(i);
  }
  removeSession(sess){
    console.log("sess: " + JSON.stringify(sess));
    const index: number = this.confSessions[sess.dayNum-1].indexOf(sess);
    if (index !== -1) {
      for(let i = index; i< this.confSessions[sess.dayNum-1].length; i++){
        this.confSessions[sess.dayNum-1][i].time -= sess.duration;
      }
      this.timeTable[sess.dayNum-1] -= sess.duration;
      this.confSessions[sess.dayNum-1].splice(index, 1);
    }
  }
  createSession(form: NgForm) {
    console.log("time table: "+ this.timeTable);
    this.data.name = form.value.name;
    this.data.session_type = form.value.session_type;
    this.data.duration = form.value.duration;
    this.data.dayNum = this.selectedDay+1;
    this.data.time = this.timeTable[this.selectedDay];
    this.timeTable[this.selectedDay] = this.timeTable[this.selectedDay] + this.data.duration;
    console.log("dynum: " + this.selectedDay);
    let insertData = Object.assign({}, this.data);
    this.confSessions[this.selectedDay].push(insertData);
    console.log("conf session: "+ JSON.stringify(this.confSessions));
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
