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
  confId:string;
  visitors:any={};
  data:any={};
  panelOpenState: boolean = false;
  profilePie:number;

  constructor(private myConfService: myConfService,
              private router: Router) { }

  ngOnInit() {
      this.visitor_id = localStorage.getItem('visitorId');
      this.confId = '5ad3db7e42dd9425ecb5fc49';

      this.data.visitorid=this.visitor_id;
      this.data.confid=this.confId;
      this.myConfService.matching(this.data,(matchingPeople)=>{
      if(matchingPeople==='error') console.log("error")
      else {
        this.visitors=matchingPeople;

         console.log("success")
      }
      });
  }
}
