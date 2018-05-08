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
  isCreated: Boolean = true;


  constructor(private RegToConfService: RegToConfService,
              private router: Router, private r:ActivatedRoute) { }

  ngOnInit() {

  }

  childStatusChanged(bool){
    console.log("bool: " + bool);
    this.isCreated = bool;
  }



}
