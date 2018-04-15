import { Component, OnInit } from '@angular/core';
import { Visitor } from "../models/visitor";
import { myConfService } from "../services/myConf.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-my-conf-lecture',
  templateUrl: './my-conf-lecture.component.html',
  styleUrls: ['./my-conf-lecture.component.css']
})
export class MyConfLectureComponent implements OnInit {
  lectureId: string;
  qrcode: any = {};
  visitor: Visitor;
  confId: string;
  inConf: boolean;
  constructor(private myConfService: myConfService,
    private router: Router, private r: ActivatedRoute) { }

  ngOnInit() {
    this.myConfService._qrcode.subscribe((qrcode) => {
      this.myConfService._visitor.subscribe((visitor) => {
        // this.myConfService._confId.subscribe((confId) => {
        console.log(qrcode);
        this.qrcode = qrcode;
        console.log(visitor);
        this.visitor = visitor;
        this.confId = '5aca81ae58bd880510606ad4';
        console.log(this.confId);
        this.inConf = this.myConfService.lectureInConf(visitor, this.confId, qrcode.id)
        if (!this.inConf) {

        };
        // });
      });
    });

  }

  buildPath() {
    console.log("lalala" + this.visitor._id);
    this.myConfService.appendPrefferedLecture('5aac4e3dafc0b334f06e3ed8', this.confId, this.qrcode.id)
      .then((added) => {
        console.log("lecture added");
        this.myConfService.appendTopic('5aac4e3dafc0b334f06e3ed8', this.confId, 'IOT-D')
          .then((added) => {
            console.log("topic added");
            this.myConfService.buildPath('5aac4e3dafc0b334f06e3ed8', this.confId)
              .then((path) => {
                console.log(path);
              });
          });
      });
  }
}
