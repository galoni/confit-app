import {Component, ElementRef, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { RegToConfService } from "../services/regToConf.service";
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Conf} from '../models/conf';
import {Subscription} from 'rxjs/Subscription';
import { Lecture } from "../models/lecture";


@Component({
  selector: 'app-register-conf-lectures',
  templateUrl: './register-conf-lectures.component.html',
  styleUrls: ['./register-conf-lectures.component.css']
})
export class RegisterConfLecturesComponent implements OnInit {
  selectedLecture1:Lecture;
  selectedLecture2:Lecture;
  selectedLecture3:Lecture;
  lectures_data:any={};
  subscription: Subscription;
  selectedConf: Conf;
  visitor_id:string;
  selectData: any= [];
  confTopics: string[]= [];

  constructor(private RegToConfService: RegToConfService,
              private router: Router, private r:ActivatedRoute) { }

  ngOnInit() {
    this.visitor_id = localStorage.getItem('visitorId');
    this.subscription = this.RegToConfService.RegConf$
      .subscribe(conf => {
        this.selectedConf = conf;
        for (let i = 0; i < this.selectedConf.main_topics.length; i++){
          this.confTopics.push(this.selectedConf.main_topics[i]);
          const lctObj: any = {};
          lctObj.topic = this.selectedConf.main_topics[i];
          lctObj.lectures = [];
          this.selectData.push(lctObj);
          //console.log("topic: " + this.selectData);
        }
        for (let tIndex = 0; tIndex < this.confTopics.length; tIndex++) {// loop over topic
          this.selectData[tIndex].lectures = this.selectedConf.lectures.filter(lct => lct.topic === this.confTopics[tIndex]);
        }
      });
  }

  addLectures(form: NgForm) {
  this.lectures_data.visitorid=this.visitor_id;
  this.lectures_data.confid = this.selectedConf._id;
  this.lectures_data.lecture1 = this.selectedLecture1._id;
  this.lectures_data.lecture2 = this.selectedLecture2._id;
  this.lectures_data.lecture3 = this.selectedLecture3._id;
  console.log(this.lectures_data)
  this.RegToConfService.addLectures(this.lectures_data,(lectures_data)=>{
    if(lectures_data==='error') console.log("error")
    else console.log("success")
  });
  }

}
