import { Component, OnInit } from '@angular/core';
import { Conf } from "../models/conf";
import { ManageQRCodeService } from "../services/manageQRCode.service";
import { Manager } from '../models/manager';
import { ManagerService } from '../services/manager.service';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-manage-qr-code',
  templateUrl: './manage-qr-code.component.html',
  styleUrls: ['./manage-qr-code.component.css']
})
export class ManageQrCodeComponent implements OnInit {
  manager: Manager;
  managerId: string;
  confs: Conf[];
  conf: Conf;
  confControl = new FormControl('', [Validators.required]);

  constructor(private ManageQRCodeService: ManageQRCodeService,
    private managerService: ManagerService) { }

  ngOnInit() {
    this.managerId = '5b05d5e0fb6fc07806588b70';
    this.managerService.getAllConfById(this.managerId).then((cnfs) => {
      console.log('Num confs: ' + cnfs.length);
      this.confs = cnfs;
    });
  }
  open(event, item) {
    console.log(item);
    if (item) {
      this.ManageQRCodeService.getConfById(item._id).then((confs) => {
        console.log(confs);
        this.conf = confs;
        this.ManageQRCodeService.setConf(this.conf);
      });
    }
    else {
      console.log("bad input, no action");
    }
  }
  // onSubmit(f: NgForm) {
  //   console.log(f.value.id);
  //   if (f.value.id) {
  //     this.ManageQRCodeService.getConfById(f.value.id).then((confs) => {
  //       console.log(confs);
  //       this.conf = confs;
  //       this.ManageQRCodeService.setConf(this.conf);
  //     });
  //   }
  //   else {
  //     console.log("bad input, no action");
  //   }
  // }


}
