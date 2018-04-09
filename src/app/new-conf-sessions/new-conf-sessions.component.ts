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
  program: ConfSession[]= [];
  

  constructor(private newConfService: NewConfService,
              private router: Router, private r:ActivatedRoute) { }

  ngOnInit() {
    this.confId = localStorage.getItem('confId');
    if(!this.confId) {
      this.confId = "5aca7954e525c61f543c91e9";
    }
    this.confSessions = JSON.parse(localStorage.getItem('confSessions'));
    console.log("conf session 1: " + JSON.stringify(this.confSessions));
    this.numDays = +(localStorage.getItem('confDuration'));
    if(this.numDays){
      console.log("numDays: " + this.numDays);
    }
    else{
      this.numDays = 3;
    }
    if (this.confSessions == undefined){
      this.confSessions = [];
      for(let i=0; i< this.numDays; i++){
        this.timeTable[i] = this.startTime;
        this.confSessions[i] = [];
      }
    }
    else{
      this.timeTable = JSON.parse(localStorage.getItem("timeTable"));
    }
  }
  onChange(day){
    // console.log("day: " + day);
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
      localStorage.setItem("confSessions", JSON.stringify(this.confSessions));
      localStorage.setItem("timeTable", JSON.stringify(this.timeTable));
    }
  }
  createSession(form: NgForm) {
    // console.log("time table: "+ this.timeTable);
    this.data.name = form.value.name;
    this.data.session_type = form.value.session_type;
    this.data.duration = form.value.duration;
    this.data.dayNum = this.selectedDay+1;
    this.data.time = this.timeTable[this.selectedDay];
    this.timeTable[this.selectedDay] = this.timeTable[this.selectedDay] + this.data.duration;
    // console.log("dynum: " + this.selectedDay);
    this.data.lectures=[];
    let sess = new ConfSession(this.data.name, this.data.session_type, this.data.duration, this.data.dayNum, this.data.time,this.data.lectures);
    // console.log("sess: " + JSON.stringify(sess));
    // let insertData = Object.assign({}, this.data);
    this.confSessions[this.selectedDay].push(sess);
    console.log("conf session: "+ JSON.stringify(this.confSessions));
    localStorage.setItem("confSessions", JSON.stringify(this.confSessions));
    localStorage.setItem("timeTable", JSON.stringify(this.timeTable));
  }
  createProgram(){
    for(let i = 0; i < this.confSessions.length; i++){
      for(let j = 0; j < this.confSessions[i].length; j++){
        this.program.push(this.confSessions[i][j]);
      }
    }
    this.newConfService.createProgram(this.program, this.confId).then((conf) =>{
      console.log(conf);
      this.router.navigate(["../program"], { relativeTo: this.r });
    });
  }

}
