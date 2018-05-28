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

  constructor(private myConfService: myConfService,
    private router: Router, private r: ActivatedRoute) { }

  ngOnInit() {
        // this.visitor = new Visitor("linkedin", "education", "occupation", "qr_code");
        // this.visitorId = localStorage.getItem('visitorId');
        // this.myConfService.getVisitorById(this.visitorId).then((visitor) => {
        //   if (visitor) {
        //     this.visitor=visitor;
        //     console.log(this.visitor);
        //   }
        // });
    this.visitor = JSON.parse(localStorage.getItem('currentUser'));
  }

}
