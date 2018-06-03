import { Component, OnInit, Input } from '@angular/core';
import { myConfService } from "../services/myConf.service";
import { Lecture } from "../models/lecture";
import { Visitor } from "../models/visitor";
import { Conf } from "../models/conf";
import { ConfSession } from "../models/confSession";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {MAT_TOOLTIP_DEFAULT_OPTIONS, MatTooltipDefaultOptions} from '@angular/material';

/** Custom options the configure the tooltip's default show/hide delays. */
export const myCustomTooltipDefaults: MatTooltipDefaultOptions = {
  showDelay: 1000,
  hideDelay: 3000,
  touchendHideDelay: 1000
};

@Component({
  selector: 'app-my-conf-path',
  templateUrl: './my-conf-path.component.html',
  styleUrls: ['./my-conf-path.component.css'],
  providers: [
    {provide: MAT_TOOLTIP_DEFAULT_OPTIONS, useValue: myCustomTooltipDefaults}
  ]
})

export class MyConfPathComponent implements OnInit {
  confId: string;
  visitorId: string;
  visitorSon: Visitor;
  btnData: any = {};
  program: any = {};
  sessions: any = [];
  data: any = [];

  constructor(private myConfService: myConfService,
    private router: Router, private r: ActivatedRoute) {
  }

  ngOnInit() {
    this.r.queryParams
      .subscribe(params => {
        if (params.type && params.id) {
          // this.qrcode.type = params.type;
          this.confId = params.id;
          // this.qrcode.data = params.data;
        }
      });
    // this.confId = localStorage.getItem('confId');
    console.log("this.confId in path=" + this.confId);
    this.visitorId = localStorage.getItem('visitorId');
    // this.myConfService.visitorSelected.subscribe((visitor) => {
    this.myConfService.getVisitorById(this.visitorId).then((visitor) => {
      console.log("inside path get visitor");

      this.visitorSon = visitor;
      if (this.visitorSon == null) {
        return;
      }
      console.log("kaka" + this.visitorSon);

      this.program = this.visitorSon.confs.find(x => x.confId == this.confId);
      // console.log(this.program);
      console.log("this is the length" + this.program.custome_path[0].session_list.length );
      for (let i = 0; i < this.program.custome_path[0].session_list.length; i++) {
        this.sessions.push(this.program.custome_path[0].session_list[i]);
      }
      console.log(this.sessions[0].session.dayNum);
      var maxDay = 0;
      for (let j = 0; j < this.sessions.length; j++) {
        var dayNum = this.sessions[j].session.dayNum;
        if (dayNum > maxDay) {
          maxDay = dayNum;
        }
      }
      console.log(maxDay);
      for (let i = 0; i < maxDay; i++) {
        this.data[i] = [];
      }
      for (let i = 0; i < this.sessions.length; i++) {
        dayNum = this.sessions[i].session.dayNum;
        this.data[dayNum - 1].push(this.sessions[i]);
      }
      console.log("data: " + JSON.stringify(this.data[0]));

    })

  }
  lctPressed(event, lct) {
    this.btnData.type = 'lecture';
    this.btnData.id = lct._id;
    this.btnData.data = lct.name;
    this.myConfService.setQRCode_lecture(this.btnData);
    this.router.navigate(["./"], { relativeTo: this.r, queryParams: { data: lct.name, type: 'lecture', id: lct._id} } );

  }
}
