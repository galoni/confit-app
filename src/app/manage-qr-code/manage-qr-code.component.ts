import { Component, OnInit } from '@angular/core';
import {Conf} from "../models/conf";
import { ManageQRCodeService } from "../services/manageQRCode.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-manage-qr-code',
  templateUrl: './manage-qr-code.component.html',
  styleUrls: ['./manage-qr-code.component.css']
})
export class ManageQrCodeComponent implements OnInit {
confs: Conf[];
  constructor(private ManageQRCodeService: ManageQRCodeService,
              private router: Router, private r:ActivatedRoute) { }

  ngOnInit() {
    this.ManageQRCodeService.getConfById('5ad23f43f3d0522aa8f3c78e').then((confs)=>{
            console.log(confs);
            this.confs.push(confs);
      })
  }

}
