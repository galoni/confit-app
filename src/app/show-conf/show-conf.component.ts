import {Component, Input, OnInit} from '@angular/core';
import { NewConfService } from '../services/newConf.service';
import { ManagerService } from '../services/manager.service';
import { ConfSession } from '../models/confSession';
import { ActivatedRoute, Router } from '@angular/router';
import { Conf } from '../models/conf';
import { Lecture } from '../models/lecture';
import {Subscription} from 'rxjs/Subscription';
import {NewConfSessionsComponent} from '../new-conf-sessions/new-conf-sessions.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EditConfSessionComponent} from '../edit-conf-session/edit-conf-session.component';
import {NewConfProgramComponent} from '../new-conf-program/new-conf-program.component';

@Component({
  selector: 'app-show-conf',
  templateUrl: './show-conf.component.html',
  styleUrls: ['./show-conf.component.css']
})
export class ShowConfComponent implements OnInit {
  confId: string;
  confSession: ConfSession[];
  lectures: Lecture[] = [];
  data: any = [];
  avialble= true;
  conf: Conf;
  subscription: Subscription;
  selectedConf: Conf;
  @Input() fConf: Conf;
  confSessions: ConfSession[][] = [];

  constructor(private newConfService: NewConfService,
              private managerService: ManagerService,
              public dialog: MatDialog,
              private router: Router, private r: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.managerService.selectedConf$
      .subscribe(conf => this.conf = conf);
    // console.log('new conf: ' + JSON.stringify(this.conf));
    // this.confId = this.selectedConf._id;
    this.conf = this.fConf;
    if (!this.conf) {
      this.confId = '5aeb7d196226470004135c4c';
      this.newConfService.getConfById(this.confId).then((conf) => {
        this.conf = conf;
        // console.log('the conf2: ' + JSON.stringify(this.conf));
        this.initData(conf);
        // this.newConfService.newConf.emit(this.conf);
      });
    }
    else {
      // console.log('the conf: ' + JSON.stringify(this.conf));
      this.initData(this.conf);
    }
    console.log(this.confId);
  }
  initData(conf) {
    for (let i = 0; i < conf.duration; i++) {
      this.data[i] = [];
    }
    this.confSession = conf.program;
    // console.log(this.conf.program);
    // console.log("data: "+ JSON.stringify(this.data));
    for (let i = 0; i < conf.program.length; i++) {
      this.data[conf.program[i].dayNum - 1].push(conf.program[i]);
    }
    this.conf.program = this.data;
    this.avialble = false;
  }
  openDialogSess(): void {
    // console.log('dig conf: ' + JSON.stringify(this.conf));
    let dialogRef = this.dialog.open(EditConfSessionComponent, {
      width: '830px',
      data: this.conf
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:' + JSON.stringify(result));
      // this.confSession = result;
    });
  }
  openDialogProg(): void {
    // console.log('dig conf: ' + JSON.stringify(this.conf));
    let dialogRef = this.dialog.open(NewConfProgramComponent, {
      width: '830px',
      data: this.conf
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.conf = result;
    });
  }
}
