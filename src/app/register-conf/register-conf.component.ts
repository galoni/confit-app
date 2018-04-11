import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { RegToConfService } from "../services/regToConf.service";
import {Conf} from "../models/conf";
import { Lecture } from "../models/lecture";

@Component({
  selector: 'app-register-conf',
  templateUrl: './register-conf.component.html',
  styleUrls: ['./register-conf.component.css']
})
export class RegisterConfComponent implements OnInit {
  data:any= {};
  lectures_data:any={};
  topics_data:any={};
  confs: Conf[];
  selectedConf: Conf = null;
  selectedLecture1:Lecture;
  selectedLecture2:Lecture;
  selectedLecture3:Lecture;
  topic1:string;
  topic2:string;
  topic3:string;
  //localStorage.setItem('visitorId','5aac4e3dafc0b334f06e3ed8');

  visitor_id: string;

  constructor(private RegToConfService: RegToConfService,
              private router: Router, private r:ActivatedRoute) { }

  ngOnInit() {
localStorage.setItem('visitorId','5acbcacb1dec292e38d88760');
this.visitor_id = localStorage.getItem('visitorId');
    this.RegToConfService.getAllConfs().then((confs)=>{
            console.log(confs);
            this.confs = confs;
      })
  }

    register(form: NgForm) {

    console.log("inside register.ts");
    this.data.visitorid=this.visitor_id;
    this.data.confid = this.selectedConf._id;
    this.data.confname = this.selectedConf.name;
    this.data.connection_precent = form.value.connection;
    console.log(form.value.connection);
    this.data.learn_precent = form.value.learn;
    this.data.explore_precent = form.value.explore;
    this.RegToConfService.registerToConf(this.data,(data)=>{
      if(data==='error') console.log("error")
      else console.log("success")
    });
    form.reset();
    }

    addLectures(form: NgForm) {
    console.log("inside addLectures.ts");
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

        addTopics(form: NgForm) {

    console.log("inside addTopics.ts");
    this.topics_data.visitorid=this.visitor_id;
    this.topics_data.confid = this.selectedConf._id;
    this.topics_data.topic1 = form.value.topic1;
    this.topics_data.topic2 = form.value.topic2;
    this.topics_data.topic3 = form.value.topic3;
    this.RegToConfService.setTopics(this.topics_data,(topics_data)=>{
      if(topics_data==='error') console.log("error")
      else console.log("success")
    });
    }

}
