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
import {AlertService} from '../services/alert.service';

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
  loadedLecture = true;
  confId: string = localStorage.getItem('confId');
  inConf: boolean=false;
  constructor(private myConfService: myConfService,
              public dialog: MatDialog,
              private router: Router, private r: ActivatedRoute,
              public dialogRef: MatDialogRef<MyConfLectureComponent>,
              private alertService: AlertService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.confId=localStorage.getItem('confId');
    this.myConfService.getLectureById(this.data)
      .then((lecture) => {
        this.lecture = lecture;
        console.log(this.lecture);
        this.visitor = JSON.parse(localStorage.getItem('currentUser'));
        console.log("this is in lecture");
        console.log(this.visitor);
        this.confId = localStorage.getItem('confId');
        console.log("confId: " + this.confId);
        this.myConfService.lectureInConf(this.visitor, this.confId, this.data, inConf => {
          this.inConf = inConf;
          console.log(this.inConf);
        });
        this.loadedLecture = false;
      });
  }

  buildPath() {
    console.log("lalala" + this.visitor._id);
    this.confId = localStorage.getItem('confId');
    if (!this.confId || !this.visitor._id){
      this.alertService.error("Error Building Path!");
    }
    this.myConfService.appendPrefferedLecture(this.visitor._id, this.confId, this.lecture._id)
      .then((added) => {
        console.log("lecture added");
        this.myConfService.appendTopic(this.visitor._id, this.confId, this.lecture.topic)
          .then((added) => {
            console.log("topic added");
            this.myConfService.buildPath(this.visitor._id, this.confId)
              .then((path) => {
                console.log(path);
                this.alertService.success("New Path Built! :)");
              })
              .catch(err => {
                this.alertService.error("Error Building Path!");
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
