import { Component, OnInit, Input } from '@angular/core';
import { myConfService } from "../services/myConf.service";
import { Lecture } from "../models/lecture";
import { Visitor } from "../models/visitor";
import { Conf } from "../models/conf";
import { ConfSession } from "../models/confSession";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-my-conf-path',
  templateUrl: './my-conf-path.component.html',
  styleUrls: ['./my-conf-path.component.css']
})

export class MyConfPathComponent implements OnInit {
  confId: string;
  visitorSon: Visitor;
  program: any = {};
  sessions: any = [];
  data: any = [];

  constructor(private myConfService: myConfService,
    private router: Router, private r: ActivatedRoute) {
  }

  ngOnInit() {
    this.myConfService.visitorSelected.subscribe((visitor) => {
      this.visitorSon = visitor;
      if (this.visitorSon == null) {
        return;
      }
      this.confId = localStorage.getItem('confId');
      this.program =  this.visitorSon.confs.find(x => x.confId == this.confId);
      for (let i = 0; i< this.program.custome_path.length;i++){
        this.sessions.push(this.program.custome_path[i].sessions);
      }
      var maxDay = 0;
      for(let j = 0; j < this.sessions.length; j++){
        var dayNum = this.sessions[j].dayNum;
        if (dayNum > maxDay){
          maxDay = dayNum;
        }
      }
      for (let i=0;i<maxDay;i++){
        this.data[i]=[];
      }
      for(let i = 0; i < this.sessions.length; i++){
        dayNum = this.sessions[i].dayNum;
        this.data[dayNum-1].push(this.sessions[i]);
      }
      console.log("data: "+ JSON.stringify(this.data[0]));

    })

  }
}
