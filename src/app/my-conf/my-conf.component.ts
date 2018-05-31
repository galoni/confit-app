import { Component, OnInit } from '@angular/core';
import { Visitor } from "../models/visitor";
import { myConfService } from "../services/myConf.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Conf } from "../models/conf";

@Component({
  selector: 'app-my-conf',
  templateUrl: './my-conf.component.html',
  styleUrls: ['./my-conf.component.css'],
})
export class MyConfComponent implements OnInit {
  visitor: Visitor;
  visitorSonId: string;
  visitorId: string;
  confId: string;
  data: any = {};
  conf: Conf;
  qrcode: any = {
    data: '',
    type: '',
    id: ''
  };

  wrongConf: boolean = false;
  getmsg: string;
  custom_path: any = {};
  constructor(private myConfService: myConfService,
    private router: Router, private r: ActivatedRoute) { }

  ngOnInit() {
    this.r.queryParams
      .subscribe(params => {
        console.log("params: " + params['type']);
        console.log("params: " + params['id']);
        console.log("params: " + params['data']);

        if (params.type && params.id) {
          this.qrcode.type = params.type;
          this.qrcode.id = params.id;
          this.qrcode.data = params.data;
        }
      });
    // localStorage.setItem('QRCode', '');
    // console.log("localStorage qrcode=" + localStorage.getItem('QRCode'));
    this.visitor = new Visitor("linkedin", "education", "occupation", "qr_code");
    this.visitorId = localStorage.getItem('visitorId');
    this.myConfService.getVisitorById(this.visitorId).then((visitor) => {
      if (visitor) {
        this.visitor = visitor;
        this.myConfService.setVisitor(this.visitor);
        console.log(this.visitor);
        if (this.qrcode.type != '') {
          // this.qrcode = JSON.parse(localStorage.getItem('QRCode'));
          //this.myConfService.setQRCode(this.qrcode);
          if (this.qrcode.type === 'lecture') {
            this.myConfService.setQRCode_lecture(this.qrcode);
          }
          if (this.qrcode.type === 'visitor') {
            this.myConfService.setQRCode_visitor(this.qrcode);
          }
          if (this.qrcode.type == 'conference') {
            console.log("THIS IS CONF!");
            this.myConfService.setQRCode_conf(this.qrcode);
            if (visitor.confs.some(x => x.confId === this.qrcode.id)) {
              localStorage.setItem('confId', this.qrcode.id);
            }
            else {
              this.wrongConf = true;
              this.qrcode.type = '';
            }
          }
          if (localStorage.getItem('confId') != null)
            this.confId = localStorage.getItem('confId');
          this.myConfService.setConfId(this.confId);
          if (this.qrcode.type == 'visitor') {
            this.visitorSonId = this.qrcode.id;
            console.log("visitorSonId:  " + this.visitorSonId);
          }
          console.log(this.qrcode.type);
          console.log("qrcode_id" + this.qrcode.id)
        }

      }
    });
  }
  onSubmit(f: NgForm) {
    console.log(f.value);
    if (f.value.id && f.value.type) {
      this.qrcode.id = f.value.id;
      this.qrcode.type = f.value.type;
      this.qrcode.data = '';
      console.log("qrcode.type=" + this.qrcode.type);
      if (this.qrcode.type === 'visitor') {
        console.log("inside visitor qrcode");
        console.log("qrcode" + this.qrcode.id);
        console.log("visitor=" + JSON.stringify(this.visitor));
        this.myConfService.setVisitor(this.visitor);
        this.myConfService.setQRCode_visitor(this.qrcode);

      }
      if (this.qrcode.type === 'lecture') {
        console.log("inside lecture qrcode");
        console.log("visitor=" + JSON.stringify(this.visitor));
        this.myConfService.setVisitor(this.visitor);
        this.myConfService.setQRCode_lecture(this.qrcode);

      }
      if (this.qrcode.type === 'conference') {
        console.log("inside conference qrcode");
        localStorage.setItem('confId', this.qrcode.id);
        console.log(localStorage.getItem('confId'));

      }
    }
    else {
      console.log("bad input, no action");
    }
  }


}
