import { Component, OnInit, Input } from '@angular/core';
import { myConfService } from "../services/myConf.service";
import { Lecture } from "../models/lecture";
import { Visitor } from "../models/visitor";
import { Conf } from "../models/conf";
import { ConfSession } from "../models/confSession";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-my-conf-path',
  templateUrl: './my-conf-path.component.html',
  styleUrls: ['./my-conf-path.component.css']
})

export class MyConfPathComponent implements OnInit {
  qrcode:any={};
  conf: Conf;
  visitorSon: Visitor;

  constructor(private myConfService: myConfService,
    private router: Router, private r: ActivatedRoute) {
     }

  ngOnInit() {
    this.myConfService.visitorSelected.subscribe((visitor) => {
      this.visitorSon = visitor;
      if (this.visitorSon == null){
        return;
      }
        console.log(this.visitorSon._id);
    })

  }
}
