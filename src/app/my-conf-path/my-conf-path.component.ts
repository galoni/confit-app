import { Component, OnInit } from '@angular/core';
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
  visitor: string;
  visitorId: string;
  constructor(private myConfService: myConfService,
    private router: Router, private r: ActivatedRoute) { }

  ngOnInit() {
    
  }
}
