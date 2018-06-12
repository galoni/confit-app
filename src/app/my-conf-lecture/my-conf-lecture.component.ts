import {Component, Inject, OnInit} from '@angular/core';
import { Visitor } from "../models/visitor";
import { Lecture } from "../models/lecture";
import { myConfService } from "../services/myConf.service";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {ConfStatsComponent} from '../conf-stats/conf-stats.component';
import {RateLectureComponent} from '../rate-lecture/rate-lecture.component';
import {EditConfSessionComponent} from '../edit-conf-session/edit-conf-session.component';

@Component({
  selector: 'app-my-conf-lecture',
  templateUrl: './my-conf-lecture.component.html',
  styleUrls: ['./my-conf-lecture.component.css']
})
export class MyConfLectureComponent implements OnInit {
  lectureId: string;
  qrcode: any = {};
  visitor: Visitor;
  lecture: Lecture;
  confId: string;
  inConf: boolean=false;
  constructor(private myConfService: myConfService,
              public dialog: MatDialog,
              private router: Router, private r: ActivatedRoute,
              public dialogRef: MatDialogRef<EditConfSessionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.myConfService._qrcode_lecture.subscribe((qrcode) => {
      this.myConfService._visitor.subscribe((visitor) => {
        if (qrcode.id){
          this.myConfService.getLectureById(qrcode.id)
          .then((lecture) => {
            this.lecture = lecture;
            console.log(this.lecture);
            console.log(qrcode);
            this.qrcode = qrcode;
            this.visitor = visitor;
            console.log("myvisitor: %j" ,this.visitor);
            this.confId = localStorage.getItem('confId');
            console.log(this.confId);
            this.inConf = this.myConfService.lectureInConf(visitor, this.confId, qrcode.id);
          });
        }
      });
    });

  }

  buildPath() {
    console.log("lalala" + this.visitor._id);
    this.myConfService.appendPrefferedLecture(this.visitor._id, this.confId, this.lecture._id)
      .then((added) => {
        console.log("lecture added");
        this.myConfService.appendTopic(this.visitor._id, this.confId, this.lecture.topic)
          .then((added) => {
            console.log("topic added");
            this.myConfService.buildPath(this.visitor._id, this.confId)
              .then((path) => {
                console.log(path);
              });
          });
      });
  }
  openDialogRate(): void {
    // console.log('dig conf: ' + JSON.stringify(this.conf));
    let dialogRef = this.dialog.open(RateLectureComponent, {
      data: this.lecture
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.conf = result;
    });
  }
}
