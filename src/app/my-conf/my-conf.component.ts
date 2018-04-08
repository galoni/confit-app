import { Component, OnInit } from '@angular/core';
import { Visitor } from "../models/visitor";
import { myConfService } from "../services/myConf.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-my-conf',
  templateUrl: './my-conf.component.html',
  styleUrls: ['./my-conf.component.css']
})
export class MyConfComponent implements OnInit {
  visitor: string;
  visitorId: string;
  confId: string;
  path: {};
  constructor(private myConfService: myConfService,
    private router: Router, private r: ActivatedRoute) { }

  ngOnInit() {
  }
  Submitvisitor(form: NgForm) {
    console.log("user typed: " + form.value.visitorId);
    console.log("user typed: " + form.value.confId);
    localStorage.setItem('visitorId', form.value.visitorId);
    localStorage.setItem('confId', form.value.confId);
    this.myConfService.getVisitorById(form.value.visitorId).then((visitor) => {
      if (!visitor) {
        console.log("Bad Input");
      }
      else {
        console.log(JSON.stringify(visitor));
        localStorage.setItem('visitor', JSON.stringify(visitor));
      }


    })
    this.visitor = localStorage.getItem('visitor');
    this.path = JSON.parse(this.visitor);
    this.path = this.path["custome_path"];

    console.log(this.visitor);
  }
}
