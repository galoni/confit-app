import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManagerService } from '../services/manager.service';
import {AlertService} from '../services/alert.service';
import { Conf } from "../models/conf";
import { Manager } from '../models/manager';
import { Push_NotificationService } from '../services/push_notification.service';
import { Push_Notification } from '../models/push_notification';
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
  push_notification: Push_Notification;
  form: FormGroup;

  constructor(private managerService: ManagerService,private Push_NotificationService: Push_NotificationService,private formBuilder: FormBuilder, private alertService: AlertService) {

  }

  ngOnInit() {
    this.manager = JSON.parse(localStorage.getItem('currentUser'));
    this.managerId = this.manager._id;
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
    this.managerService.sendMessageByTopic(this.conf.name, this.message)
    .then(data => {
      if (data) {
        this.alertService.success("Message sent!");
        this.Push_NotificationService.getMessagesByTopic(this.conf.name)
        .then(push_notification => {
          if (push_notification){
            this.push_notification = push_notification;
            console.log(this.push_notification);
          }
        })
        .catch(err => {
          this.alertService.error("There was an issue showing the messages");
          console.log(err);
        })
      }
      else{
        this.alertService.error("There was an issue sending the message");
      }

    });


  }

}
