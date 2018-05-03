import {Component, ElementRef, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { RegToConfService } from "../services/regToConf.service";
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Conf} from '../models/conf';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-register-conf-topics',
  templateUrl: './register-conf-topics.component.html',
  styleUrls: ['./register-conf-topics.component.css']
})
export class RegisterConfTopicsComponent implements OnInit {
  visitor_id: string;
  confId:string;
  topic1:string;
  topic2:string;
  topic3:string;
  topics_data:any={};
  subscription: Subscription;
  selectedConf: Conf;

  constructor(private RegToConfService: RegToConfService,
              private router: Router, private r:ActivatedRoute) { }

  ngOnInit() {
    this.visitor_id = localStorage.getItem('visitorId');
    this.subscription = this.RegToConfService.RegConf$
      .subscribe(conf => this.selectedConf = conf);
  }

  addTopics(form: NgForm) {
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
