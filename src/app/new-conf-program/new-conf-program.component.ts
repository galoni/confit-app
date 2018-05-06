import {Component, Inject, OnInit} from '@angular/core';
import { NewConfService } from '../services/newConf.service';
import { ConfSession } from '../models/confSession';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Conf} from '../models/conf';
import {Lecture} from '../models/lecture';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {Subscription} from 'rxjs/Subscription';
import {EditConfSessionComponent} from '../edit-conf-session/edit-conf-session.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {ManagerService} from '../services/manager.service';

@Component({
  selector: 'app-new-conf-program',
  templateUrl: './new-conf-program.component.html',
  styleUrls: ['./new-conf-program.component.css']
})
export class NewConfProgramComponent implements OnInit {
  confId: string;
  confSession: ConfSession[];
  numDays: number;
  conf: Conf;
  lectures: Lecture[] = [];
  dataProg: any = [];
  avialble= true;
  subscription: Subscription;
  newConf: Conf;

  constructor(private newConfService: NewConfService,
              private managerService: ManagerService,
              private router: Router, private r: ActivatedRoute,
              public dialogRef: MatDialogRef<EditConfSessionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.numDays = this.data.duration;
    this.confId = this.data._id;
    // console.log('data: ' + JSON.stringify(this.data.program[0][0].lectures));
    if (this.data.program[0][0].lectures.length > 0) {
      this.conf = this.data;
      this.managerService.setSelectedConf(this.conf);
      this.avialble = false;
    }
  }
  counter(i: number) {
    return new Array(i);
  }

  buildProgram() {
    for (let i = 0; i < this.numDays; i++) {
      this.dataProg[i] = [];
    }
    this.spinnerService.show();
    this.newConfService.buildProgram(this.confId).then((confSession) => {
      this.confSession = confSession;
      // console.log(this.confSession);
      // console.log("dataProg: "+ JSON.stringify(this.dataProg));
      for (let i = 0; i < this.confSession.length; i++) { // split confSessions by day
        this.dataProg[this.confSession[i].dayNum - 1].push(this.confSession[i]);
      }
      this.newConfService.getConfById(this.confId).then((conf) => {
        this.conf = conf;
        this.conf.program = this.dataProg;
        this.spinnerService.hide();
        console.log('conf1: ' + JSON.stringify(this.conf));
        // this.newConfService.newConf.emit(this.conf);
        // this.newConfService.setNewConf(this.conf);
        this.avialble = false;
      });
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
