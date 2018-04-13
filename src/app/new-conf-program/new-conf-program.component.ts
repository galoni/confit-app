import { Component, OnInit } from '@angular/core';
import { NewConfService } from "../services/newConf.service";
import { ConfSession } from "../models/confSession";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Conf} from "../models/conf";
import {Lecture} from "../models/lecture";

@Component({
  selector: 'app-new-conf-program',
  templateUrl: './new-conf-program.component.html',
  styleUrls: ['./new-conf-program.component.css']
})
export class NewConfProgramComponent implements OnInit {
  confId: string;
  confSession: ConfSession[];
  numDays: number;
  conf:Conf;
  lectures: Lecture[] = [];
  data: any = [];
  rows:number;
  cols:number;

  constructor(private newConfService: NewConfService,
              private router: Router, private r:ActivatedRoute) { }

  ngOnInit() {
    // this.data.sessDay = [];
    this.confId = localStorage.getItem('confId');
    if(!this.confId) {
      this.confId = "5aca81ae58bd880510606ad4";
    }
    this.numDays = +(localStorage.getItem('confDuration'));
    if(this.numDays){
      console.log("numDays: " + this.numDays);
    }
    else{
      this.numDays = 2;
    }
  }
  counter(i: number) {
    return new Array(i);
  }

  buildProgram(){
    for(let i = 0; i < this.numDays; i++){
      this.data[i] = [];
    }
    this.newConfService.buildProgram(this.confId).then((confSession) =>{
      this.confSession = confSession;
      // console.log(this.confSession);
      // console.log("data: "+ JSON.stringify(this.data));
      for(let i = 0; i < this.confSession.length; i++){//split confSessions by day
        this.data[this.confSession[i].dayNum-1].push(this.confSession[i]);
      }
      this.newConfService.getConfById(this.confId).then((conf) =>{
        this.conf = conf;
        this.conf.program = this.data;
        this.newConfService.newConf.emit(this.conf);
        // console.log("conf: " + JSON.stringify(this.conf));
      });
      // this.newConfService.confProgram.emit(this.data);
    });
  }
}
