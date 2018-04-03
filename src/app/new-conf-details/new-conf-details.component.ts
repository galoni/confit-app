import { Component, OnInit } from '@angular/core';
import { NewConfService } from "../services/newConf.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-new-conf-details',
  templateUrl: './new-conf-details.component.html',
  styleUrls: ['./new-conf-details.component.css']
})
export class NewConfDetailsComponent implements OnInit {
  data:any= {};
  constructor(private newConfService: NewConfService) { }

  ngOnInit() {
  }
  createConference(form: NgForm) {
    this.data.name = form.value.name;
    this.data.type = form.value.type;
    this.data.logo = form.value.logo;
    this.data.start_date = form.value.start_date;
    this.data.end_date = form.value.end_date;
    this.data.location = form.value.location;
    this.data.audience = form.value.audience;
    this.newConfService.createConference(this.data).then((conf) => {
      console.log(conf);
    });
  }
}
