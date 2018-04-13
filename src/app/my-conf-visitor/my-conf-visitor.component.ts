import { Component, OnInit, Input } from '@angular/core';
import { myConfService } from "../services/myConf.service";
import { Lecture } from "../models/lecture";
import { Visitor } from "../models/visitor";
import { Conf } from "../models/conf";
import { ConfSession } from "../models/confSession";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-my-conf-visitor',
  templateUrl: './my-conf-visitor.component.html',
  styleUrls: ['./my-conf-visitor.component.css']
})
export class MyConfVisitorComponent implements OnInit {
  confId: string;
  visitorSon: Visitor;
  visitorId: string;
  percent:number;
  biggestnumber:number;
  smallestnumber:number;

  @Input() visitorChild:Visitor;
  @Input() visitorSonId:string;

  constructor(private myConfService: myConfService,
    private router: Router, private r: ActivatedRoute) {
  }

  ngOnInit() {
    this.visitorSon = new Visitor("linkedin", "education1", "occupation", "qr_code");
    this.percent=0;
    this.confId = localStorage.getItem('confId');
    console.log("confid"+this.confId)
    this.visitorId = localStorage.getItem('visitorId');
     this.myConfService.visitorSelected.subscribe((visitor) => {
    //this.myConfService.getVisitorById(this.visitorId).then((visitor) => {
      this.visitorSon = visitor;
      if (this.visitorSon == null) {
        return;
      }
      console.log("visitorSon "+this.visitorSon.education);
});

this.myConfService.getVisitorById(this.visitorSonId).then((visitor) => {
  if (visitor) {
    this.visitorSon=visitor;
    console.log("visitorSon="+this.visitorSon.name.first_name);
    console.log("data: "+ JSON.stringify(this.visitorSon));
    console.log(this.confId);
    var indexofconf_visitor = this.visitorChild.confs.map(function(e) { return e.confId; }).indexOf(this.confId);
    console.log("indexofconf_visitor = "+indexofconf_visitor);
    var indexofconf_visitorSon = this.visitorSon.confs.map(function(e) { return e.confId; }).indexOf(this.confId);
    console.log("indexofconf_visitorSon = "+indexofconf_visitorSon);
    if(indexofconf_visitor && indexofconf_visitorSon !=-1){
      this.smallestnumber=Math.min(this.visitorSon.confs[indexofconf_visitorSon].profile_pie, this.visitorChild.confs[indexofconf_visitor].profile_pie);
      this.biggestnumber=Math.max(this.visitorSon.confs[indexofconf_visitorSon].profile_pie, this.visitorChild.confs[indexofconf_visitor].profile_pie);
      console.log(this.smallestnumber);
      console.log(this.biggestnumber);
      //this.percent=this.smallestnumber/this.biggestnumber;
      this.percent=Math.floor((this.smallestnumber / this.biggestnumber) * 100)
      console.log(this.percent);
    }
    else
    console.log("Not on the same conference")


  }});
  }

}
