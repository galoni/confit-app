import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { myConfService } from "../services/myConf.service";
import {Conf} from "../models/conf";
import { Visitor } from "../models/visitor";


@Component({
  selector: 'app-matching-page',
  templateUrl: './matching-page.component.html',
  styleUrls: ['./matching-page.component.css']
})
export class MatchingPageComponent implements OnInit {
  visitor_id: string;
  visitor:Visitor;
  confId:string;
  visitors:any=[];
  data:any={};
  panelOpenState: boolean = false;
  profilePie:number;

  constructor(private myConfService: myConfService,
              private router: Router) { }

  ngOnInit() {
      this.visitor = JSON.parse(localStorage.getItem('currentUser'));
      this.visitor_id = this.visitor._id;
      console.log(this.visitor);
      this.confId = localStorage.getItem("confId");

      this.data.visitorid=this.visitor_id;
      this.data.confid=this.confId;
      this.myConfService.matching(this.data,(matchingPeople)=>{
      if(matchingPeople==='error') console.log("error")
      else {
        this.visitors=matchingPeople;
        this.visitors.sort(function(obj1, obj2) {
      	return obj2.matching - obj1.matching;
      });
         console.log("success")
      }
      });
  }


}
