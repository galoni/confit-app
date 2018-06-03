import {Component, ElementRef, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {NgForm} from "@angular/forms";
import { RegToConfService } from "../services/regToConf.service";
import {Conf} from "../models/conf";
import {ActivatedRoute, Router} from "@angular/router";
import {ManagerService} from '../services/manager.service';
import { LandingService } from '../services/landing.service';
import { Visitor } from "../models/visitor";

@Component({
  selector: 'app-register-conf-details',
  templateUrl: './register-conf-details.component.html',
  styleUrls: ['./register-conf-details.component.css']
})
export class RegisterConfDetailsComponent implements OnInit {
  data:any= {};
  confs: Conf[];
  selectedConf: Conf = null;
  visitor_id:string;
  msgToken: string;
visitor:Visitor;
  @ViewChild('stepper') stepper;
  @Output() onStatusChange = new EventEmitter<boolean>();


  constructor(private RegToConfService: RegToConfService,
              private router: Router, private r:ActivatedRoute,private managerService: ManagerService,private LandingService: LandingService) { }


  ngOnInit() {
    this.visitor = JSON.parse(localStorage.getItem('currentUser'));
    this.visitor_id=this.visitor._id;
    localStorage.setItem('visitorId',this.visitor_id);
    this.visitor_id = localStorage.getItem('visitorId');
        this.RegToConfService.getAllConfs().then((confs)=>{
                this.confs = confs;
          });
    this.msgToken = localStorage.getItem("msgToken");
    console.log("found token: " + this.msgToken);
    }

    register(form: NgForm) {
    this.data.visitorid=this.visitor_id;
    this.data.confid = this.selectedConf._id;
    this.data.confname = this.selectedConf.name;
    localStorage.setItem('confId',this.selectedConf._id);
    this.RegToConfService.registerToConf(this.data,(data)=>{
      if(data==='error') console.log("error")
      else{
        this.RegToConfService.setRegConf(this.selectedConf);
        this.LandingService.setSelectedConf(this.selectedConf);
        console.log("success")
      }
    });

    this.managerService.subscribeToTopic(this.msgToken, this.selectedConf.name);
    this.onStatusChange.emit(true);
    }

    changeStep(index: number) {
      this.stepper.selectedIndex = index;
    }
}
