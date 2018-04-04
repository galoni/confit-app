import { Component, OnInit } from '@angular/core';
import { NewConfService } from "../services/newConf.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Conf} from "../models/conf";

@Component({
  selector: 'app-new-conf-details',
  templateUrl: './new-conf-details.component.html',
  styleUrls: ['./new-conf-details.component.css']
})
export class NewConfDetailsComponent implements OnInit {
  data:any= {};
  conf:Conf;
  constructor(private newConfService: NewConfService,
              private router: Router, private r:ActivatedRoute) { }

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
      if(conf){
        this.conf = conf;
        localStorage.setItem('confId', this.conf._id);
        console.log(this.conf._id);
        this.router.navigate(["../lectures"], { relativeTo: this.r });
      }
      else{
        console.log("error");
      }
    });
  }
}
