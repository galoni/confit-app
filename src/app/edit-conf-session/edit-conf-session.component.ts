import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Conf} from '../models/conf';
import {ConfSession} from '../models/confSession';
import {NgForm} from '@angular/forms';
import {NewConfService} from '../services/newConf.service';

@Component({
  selector: 'app-edit-conf-session',
  templateUrl: './edit-conf-session.component.html',
  styleUrls: ['./edit-conf-session.component.css']
})
export class EditConfSessionComponent implements OnInit {
  confSessions: ConfSession[][]= [];
  numDays: number;
  timeTable: number[] = [];
  selectedDay: number;
  startTime= 9;
  program: ConfSession[]= [];
  conf: Conf;
  dataSess: any= {};

  constructor(private newConfService: NewConfService,
              public dialogRef: MatDialogRef<EditConfSessionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.numDays = this.data.duration;
    // console.log('numday: ' + this.numDays);
    this.confSessions = [];
    for (let i = 0; i < this.numDays; i++) {
      this.timeTable[i] = this.startTime;
      this.confSessions[i] = [];
    }
    this.confSessions = this.data.program;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onChange(day) {
    // console.log("day: " + JSON.stringify(day));
    this.selectedDay = day;
  }
  counter(i: number) {
    return new Array(i);
  }
  plus(i) {
    this.timeTable[i]++;
    console.log('tt: ' + this.timeTable[i]);
    for (let j = 0; j < this.confSessions[i].length; j++){
      this.confSessions[i][j].time++;
    }
  }
  minus(i) {
    this.timeTable[i]--;
    console.log('tt: ' + this.timeTable[i]);
    for (let j = 0; j < this.confSessions[i].length; j++){
      this.confSessions[i][j].time--;
    }
  }
  removeSession(sess) {
    console.log('sess: ' + JSON.stringify(sess));
    const index: number = this.confSessions[sess.dayNum - 1].indexOf(sess);
    if (index !== -1) {
      for (let i = index; i < this.confSessions[sess.dayNum - 1].length; i++){
        this.confSessions[sess.dayNum - 1][i].time -= sess.duration;
      }
      this.timeTable[sess.dayNum - 1] -= sess.duration;
      this.confSessions[sess.dayNum - 1].splice(index, 1);
    }
  }
  createSession(form: NgForm) {
    // console.log("time table: "+ this.timeTable);
    this.dataSess.name = form.value.name;
    this.dataSess.session_type = form.value.session_type;
    this.dataSess.duration = form.value.duration;
    this.dataSess.dayNum = this.selectedDay + 1;
    this.dataSess.time = this.timeTable[this.selectedDay];
    this.timeTable[this.selectedDay] = this.timeTable[this.selectedDay] + this.dataSess.duration;
    // console.log("dynum: " + this.selectedDay);
    this.dataSess.lectures = [];
    const sess = new ConfSession(this.dataSess.name, this.dataSess.session_type,
                                  this.dataSess.duration, this.dataSess.dayNum,
                                  this.dataSess.time, this.dataSess.lectures);
    // console.log("sess: " + JSON.stringify(sess));
    this.confSessions[this.selectedDay].push(sess);
    console.log('conf session: ' + JSON.stringify(this.confSessions));
  }
  editProgram(conf) {
    for (let i = 0; i < this.confSessions.length; i++) {
      for (let j = 0; j < this.confSessions[i].length; j++) {
        this.confSessions[i][j].lectures = [];
        this.program.push(this.confSessions[i][j]);
      }
    }
    console.log('confId: ' + this.data._id);
    this.newConfService.createProgram(this.program, this.data._id).then((conf) => {
      console.log('conf: ' + JSON.stringify(conf));
      this.dialogRef.close();
    });
  }
}
