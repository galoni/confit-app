import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { RegToConfService } from "../services/regToConf.service";
import {Conf} from "../models/conf";

@Component({
  selector: 'app-register-conf-details',
  templateUrl: './register-conf-details.component.html',
  styleUrls: ['./register-conf-details.component.css']
})
export class RegisterConfDetailsComponent implements OnInit {
  data:any= {};
  confs: Conf[];
  selectedConf: Conf = null;

  constructor(private RegToConfService: RegToConfService,
              private router: Router, private r:ActivatedRoute) { }

  

  ngOnInit() {
      this.RegToConfService.getAllConfs().then((confs)=>{
            console.log(confs);
            this.confs = confs;
      })

    }
}