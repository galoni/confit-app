import { Component, OnInit } from '@angular/core';
import { NewConfService } from "../services/newConf.service";
import { ConfSession } from "../models/confSession";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-conf-program-show',
  templateUrl: './new-conf-program-show.component.html',
  styleUrls: ['./new-conf-program-show.component.css']
})
export class NewConfProgramShowComponent implements OnInit {
  data: any = [];

  constructor(private newConfService: NewConfService,
              private router: Router, private r:ActivatedRoute) { }

  ngOnInit() {
    this.newConfService.confProgram.subscribe((data:any)=>{
      this.data = data;
      console.log("data: "+ JSON.stringify(this.data[0]));
    });
  }

}
