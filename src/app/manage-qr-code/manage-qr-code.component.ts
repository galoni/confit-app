import { Component, OnInit } from '@angular/core';
import { Conf } from "../models/conf";
import { ManageQRCodeService } from "../services/manageQRCode.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-manage-qr-code',
  templateUrl: './manage-qr-code.component.html',
  styleUrls: ['./manage-qr-code.component.css']
})
export class ManageQrCodeComponent implements OnInit {
  conf: Conf;
  constructor(private ManageQRCodeService: ManageQRCodeService,
    private router: Router, private r: ActivatedRoute) { }

  ngOnInit() {
    console.log("hello");
  }
  onSubmit(f: NgForm) {
    console.log(f.value.id);
    if (f.value.id) {
      this.ManageQRCodeService.getConfById(f.value.id).then((confs) => {
        console.log(confs);
        this.conf = confs;
        this.ManageQRCodeService.setConf(this.conf);
      });
    }
    else {
      console.log("bad input, no action");
    }
  }


}
