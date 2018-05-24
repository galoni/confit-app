import {Component, ElementRef, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import {NgForm} from "@angular/forms";
import { RegToConfService } from "../services/regToConf.service";
import {Conf} from "../models/conf";
import {ActivatedRoute, Router} from "@angular/router";
import {ManagerService} from '../services/manager.service';


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

  @ViewChild('stepper') stepper;
  @Output() onStatusChange = new EventEmitter<boolean>();


  constructor(private RegToConfService: RegToConfService,
              private router: Router, private r:ActivatedRoute,private managerService: ManagerService) { }


  ngOnInit() {
    localStorage.setItem('visitorId','5ad3aa87c284b342775e696a');
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
