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
  //visitorSon:Visitor;
  visitorSonId:string;
  visitorId: string;
  confId: string;
  data: any = {};
  conf: Conf;
  qrcode:any={};
  wrongConf:boolean=false;
  //
  custom_path: any = {};
  constructor(private myConfService: myConfService,
    private router: Router, private r: ActivatedRoute) { }

  ngOnInit() {
    this.visitor = new Visitor("linkedin", "education", "occupation", "qr_code");
    if (localStorage.getItem('confId') === null) {
      localStorage.setItem('confId', '5aca81ae58bd880510606ad4');
      console.log("created local storage CONFID");
    }
    if (localStorage.getItem('visitorId') === null) {
      localStorage.setItem('visitorId', '5acca3aea57fc6025890f4d6');
      console.log("created local storage VISITORID");
    }

    this.visitorId = localStorage.getItem('visitorId');
    this.myConfService.getVisitorById(this.visitorId).then((visitor) => {
      if (visitor) {
        this.visitor=visitor;
        console.log(this.visitor);
        this.qrcode = JSON.parse(localStorage.getItem('QRCode'));
        if (this.qrcode.type == 'conference'){
          if (visitor.confs.some(x => x.confId === this.qrcode.id)){
            localStorage.setItem('confId', this.qrcode.id);

          }
          else{
            this.wrongConf = true;
            this.qrcode.type = '';
          }

        }
        if (this.qrcode.type == 'visitor'){
          //this.myConfService.visitorSelected.emit(this.qrcode.id);
          this.visitorSonId=this.qrcode.id;
          console.log("visitorSonId:  "+this.visitorSonId);
        }
        console.log(this.qrcode.type);
        console.log("qrcode_id"+this.qrcode.id)
      }});
    }

  }
