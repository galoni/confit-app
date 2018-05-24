import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ManagerService } from '../services/manager.service';




@Component({
  selector: 'app-manage-notifications',
  templateUrl: './manage-notifications.component.html',
  styleUrls: ['./manage-notifications.component.css']
})
export class ManageNotificationsComponent implements OnInit {
  constructor(private managerService: ManagerService) {

  }

  ngOnInit() {
}
  onSubmit(form: NgForm) {
    this.managerService.sendMessageByTopic(form.value.topic, form.value.message);

  }
}
