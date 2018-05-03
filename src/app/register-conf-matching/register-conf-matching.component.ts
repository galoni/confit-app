import {Component, ElementRef, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { RegToConfService } from "../services/regToConf.service";
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Conf} from '../models/conf';

@Component({
  selector: 'app-register-conf-matching',
  templateUrl: './register-conf-matching.component.html',
  styleUrls: ['./register-conf-matching.component.css']
})
export class RegisterConfMatchingComponent implements OnInit {
  subscription: Subscription;
  data:any= {};
  visitor_id:string;
  selectedConf: Conf;

  constructor(private RegToConfService: RegToConfService,
              private router: Router, private r:ActivatedRoute) { }


  ngOnInit() {
    this.visitor_id = localStorage.getItem('visitorId');
    this.subscription = this.RegToConfService.RegConf$
      .subscribe(conf => this.selectedConf = conf);
  }

  addPercent(connection,learn,explore) {
    this.data.visitorid=this.visitor_id;
    this.data.confid = this.selectedConf._id;
    this.data.connection_precent = connection;
    this.data.learn_precent = learn;
    this.data.explore_precent = explore;
    localStorage.setItem('confId',this.selectedConf._id);
    this.RegToConfService.updatePercent(this.data,(data)=>{
      if(data==='error') console.log("error")
      else console.log("success")
    });
  }

  /*addPercent(form: NgForm) {
    this.data.visitorid=this.visitor_id;
    this.data.confid = this.selectedConf._id;
    this.data.connection_precent = form.value.connection;
    this.data.learn_precent = form.value.learn;
    this.data.explore_precent = form.value.explore;
    localStorage.setItem('confId',this.selectedConf._id);
    this.RegToConfService.updatePercent(this.data,(data)=>{
      if(data==='error') console.log("error")
      else console.log("success")
    });
  }*/
}
