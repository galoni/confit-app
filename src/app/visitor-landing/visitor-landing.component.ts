import { Component, OnInit } from '@angular/core';
import { Visitor } from "../models/visitor";
import { myConfService } from "../services/myConf.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Conf } from "../models/conf";

@Component({
  selector: 'app-visitor-landing',
  templateUrl: './visitor-landing.component.html',
  styleUrls: ['./visitor-landing.component.css']
})
export class VisitorLandingComponent implements OnInit {
  visitor: Visitor;
  visitorId:string;
  panelOpenState: boolean = false;
  selected:string;
  confactive:string;

  constructor(private myConfService: myConfService,
    private router: Router, private r: ActivatedRoute) { }

  ngOnInit() {
    this.visitor = JSON.parse(localStorage.getItem('currentUser'));
  }
  activeConf(confactive:string){
    localStorage.setItem("confId",confactive);
    this.selected=confactive;
  }
  isActive(confid) {
    this.confactive=localStorage.getItem("confId")
    return this.confactive === confid;
  }
}
