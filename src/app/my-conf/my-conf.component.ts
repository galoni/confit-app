import { Component, OnInit } from '@angular/core';
import { Visitor } from "../models/visitor";
import { myConfService } from "../services/myConf.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Conf } from "../models/conf";
// import { MyConfPathComponent } from "../my-conf-path/my-conf-path.component";

@Component({
  selector: 'app-my-conf',
  templateUrl: './my-conf.component.html',
  styleUrls: ['./my-conf.component.css'],
  // directives: [MyConfPathComponent]
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
      localStorage.setItem('confId', '5ac62e3a12de1e24fc5a936e');
      console.log("created local storage");
    }
    if (localStorage.getItem('visitorId') === null) {
      localStorage.setItem('visitorId', '5aac4e3dafc0b334f06e3ed8');
      console.log("created local storage");
    }
    this.qrcode = JSON.parse(localStorage.getItem('QRCode'));
    console.log(this.qrcode.type);
    this.visitorId = localStorage.getItem('visitorId');
    this.myConfService.getVisitorById(this.visitorId).then((visitor) => {
      if (visitor) {
        this.visitor=visitor;
        console.log(this.visitor);
        this.myConfService.visitorSelected.emit(visitor);
      }});
    }

  }
