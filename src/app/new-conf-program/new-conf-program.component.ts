import { Component, OnInit } from '@angular/core';
import { NewConfService } from "../services/newConf.service";
import { ConfSession } from "../models/confSession";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-new-conf-program',
  templateUrl: './new-conf-program.component.html',
  styleUrls: ['./new-conf-program.component.css']
})
export class NewConfProgramComponent implements OnInit {
  confId:string;

  constructor(private newConfService: NewConfService,
              private router: Router, private r:ActivatedRoute) { }

  ngOnInit() {
    this.confId = localStorage.getItem('confId');
    if(!this.confId) {
      this.confId = "5aca7954e525c61f543c91e9";
    }
  }

  buildProgram(){
    this.newConfService.buildProgram(this.confId).then((conf) =>{
      console.log(conf);
      this.router.navigate(["../program"], { relativeTo: this.r });
    });
  }

}
