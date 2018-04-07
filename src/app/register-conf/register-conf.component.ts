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
  confs: Conf[];
  selectedConf: Conf = null;
  visitor_id="5ac62e3a12de1e24fc5a936e"
  constructor(private RegToConfService: RegToConfService,
              private router: Router, private r:ActivatedRoute) { }

  ngOnInit() {   

    this.RegToConfService.getAllConfs().then((confs)=>{
            console.log(confs);
            this.confs = confs;
      })
  }
  
    register(form: NgForm) {
    console.log("inside register.ts");
    this.data.visitorid=this.visitor_id;
    this.data.confid = this.selectedConf._id;
    this.data.connection_precent = form.value.connection;
    this.data.learn_precent = form.value.learn;
    this.data.explore_precent = form.value.explore;
    console.log(this.data)
    this.RegToConfService.registerToConf(this.data,(data)=>{
      if(data==='error') console.log("error")
      else console.log("success")
    });
    form.reset();
    }

}

