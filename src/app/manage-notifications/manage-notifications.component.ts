import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManagerService } from '../services/manager.service';
import { Conf } from "../models/conf";
import { Manager } from '../models/manager';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-manage-notifications',
  templateUrl: './manage-notifications.component.html',
  styleUrls: ['./manage-notifications.component.css']
})
export class ManageNotificationsComponent implements OnInit {
  data: any = {};
  manager: Manager;
  managerId: string;
  confs: Conf[];
  conf: Conf;
  message: string;
  form: FormGroup;

  constructor(private managerService: ManagerService,private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.managerId = '5b05d5e0fb6fc07806588b70';
    this.managerService.getAllConfById(this.managerId).then((cnfs) => {
      console.log('Num confs: ' + cnfs.length);
      this.confs = cnfs;
    });
    this.form = this.formBuilder.group({
      message: [null, [Validators.required]],
      conf: [null, Validators.required],
    });
  }
  onSubmit(form: NgForm) {
    console.log(this.conf.name);
    console.log(this.message);
    this.managerService.sendMessageByTopic(this.conf.name, this.message);

  }

}
