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
      this.numDays = 3;
    }
    for(let i = 0; i < this.numDays; i++){
      this.data[i] = [];
    }
  }
  counter(i: number) {
    return new Array(i);
  }

  buildProgram(){
    this.newConfService.buildProgram(this.confId).then((confSession) =>{
      this.confSession = confSession;
      console.log(this.confSession);
      console.log("data: "+ JSON.stringify(this.data));
      for(let i = 0; i < this.confSession.length; i++){
        let dayNum = this.confSession[i].dayNum;
        this.data[dayNum-1].push(this.confSession[i]);
      }
      console.log("data: "+ JSON.stringify(this.data[0]));
      // for(let k=1;k<this.numDays+1;k++) {
      //     for (let i = 0; i < this.confSession.length; i++) {
      //       for (let j = 0; j < this.confSession[i].lectures.length; j++) {
      //         if(k===this.confSession[i].dayNum){
      //           this.lectures.push(this.confSession[i].lectures[j]);
      //         }
      //         else j--;
      //       }
      //       this.lectures.push(this.EOS_lecture);
      //     }
      // }
      // console.log(this.lectures);
      // this.rows = Math.floor(this.lectures.length /  this.confSession.length);
      // console.log("rows: " + this.rows);
    });
  }

}
