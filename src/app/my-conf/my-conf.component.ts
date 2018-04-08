import { Component, OnInit } from '@angular/core';
import { Visitor } from "../models/visitor";
import { myConfService } from "../services/myConf.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Conf } from "../models/conf";

@Component({
  selector: 'app-my-conf',
  templateUrl: './my-conf.component.html',
  styleUrls: ['./my-conf.component.css']
})
export class MyConfComponent implements OnInit {
  visitor: Visitor;
  visitorId: string;
  confId: string;
  data: any = {};
  conf: Conf;
  qrcode:any={};
  //
  custom_path: any = {};
  constructor(private myConfService: myConfService,
    private router: Router, private r: ActivatedRoute) { }

  ngOnInit() {
    if (localStorage.getItem('confId') === null) {
      localStorage.setItem('confId', '5a85ff12734d1d1523dcef75');
      console.log("created local storage");
    }
    if (localStorage.getItem('visitorId') === null) {
      localStorage.setItem('visitorId', '5aac4e3dafc0b334f06e3ed8');
      console.log("created local storage");
    }
    this.qrcode = JSON.parse(localStorage.getItem('QRCode'));
    console.log(this.qrcode.type);
    }

    // this.data.visitorid = localStorage.getItem('visitorId');
    // console.log(localStorage.getItem('QRCode'));
    // this.myConfService.getVisitorById(this.data.visitorid).then((visitor) => {
    //   if (visitor) {
    //     this.visitor = visitor;
    //     console.log(visitor);
    //
    //     localStorage.setItem('visitorId', this.visitor._id);
    //     for (let i = 0; i < this.visitor.confs.length; i++) {
    //       if (this.visitor.confs[i].confId === this.confId) {
    //         this.custom_path = this.visitor.confs[i].custome_path;
    //         console.log(this.custom_path);
    //       }
    //     }
    //   }
    //   else {
    //     console.log("error");
    //   }
    // });
  }
  // Submitvisitor(form: NgForm) {
  //   console.log("user typed: " + form.value.visitorId);
  //   console.log("user typed: " + form.value.confId);
  //   localStorage.setItem('visitorId', form.value.visitorId);
  //   localStorage.setItem('confId', form.value.confId);
  //   this.myConfService.getVisitorById(form.value.visitorId).then((visitor) => {
  //     if (!visitor) {
  //       console.log("Bad Input");
  //     }
  //     else {
  //       localStorage.setItem('visitor', JSON.stringify(visitor));
  //       this.visitor = JSON.stringify(visitor);
  //       console.log(JSON.stringify(visitor));
  //       let confs = visitor.confs
  //       for(let i=0;i<confs.length;i++){
  //         if(confs[i].confid===form.value.confId){
  //           console.log(confs[i].confid);
  //         }
  //       }
  //     }
  //
  //
  //
  //   })
  //   // this.visitor = localStorage.getItem('visitor');
  //   // this.path = JSON.parse(this.visitor);
  //   // console.log(this.path);
  //
  //   //var item = this.path["confs"].filter(function(item) {
  //     //return item.confId === form.value.confId;
  //   //})[0];
  //   //console.log(item);
  // }
