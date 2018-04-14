import { Component, OnInit, Inject } from '@angular/core';
import { Conf } from "../models/conf";
import { Lecture } from "../models/lecture";
import { ManageQRCodeService } from "../services/manageQRCode.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-manage-qr-code-details',
  templateUrl: './manage-qr-code-details.component.html',
  styleUrls: ['./manage-qr-code-details.component.css']
})
export class ManageQrCodeDetailsComponent implements OnInit {
  confs: Conf;
  lectures: Lecture[];
  bucketPrefix: string = 'http://qr-code-storage.s3.amazonaws.com/';
  constructor(private ManageQRCodeService: ManageQRCodeService,
    private router: Router, private r: ActivatedRoute, @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    this.ManageQRCodeService.getConfById('5ad23f43f3d0522aa8f3c78e').then((confs) => {
      console.log(confs);
      this.confs = confs;
      this.lectures = confs.lectures;
      console.log(this.lectures);
    })
  }
  get_multiple_images() {
    console.log("conf id: " + this.confs._id);
    this.ManageQRCodeService.get_multiple_images(this.confs._id).then((res) => {
      console.log(res.zip);
      this.document.location.href = this.bucketPrefix+res.zip;

    })
  }

}
