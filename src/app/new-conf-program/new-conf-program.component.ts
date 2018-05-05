import { Component, OnInit } from '@angular/core';
import { NewConfService } from '../services/newConf.service';
import { ConfSession } from '../models/confSession';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Conf} from '../models/conf';
import {Lecture} from '../models/lecture';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import {Subscription} from 'rxjs/Subscription';

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
  data: any = [];
  avialble= true;
  subscription: Subscription;
  newConf: Conf;

  constructor(private newConfService: NewConfService,
              private router: Router, private r: ActivatedRoute,
              private spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.subscription = this.newConfService.newConf$
      .subscribe(conf => this.newConf = conf);
    console.log('new conf: ' + JSON.stringify(this.newConf));
    this.confId = this.newConf._id;
    if (!this.confId) {
      console.log('no new conf');
      this.confId = '5aeb7d196226470004135c4c';
      this.newConfService.getConfById(this.confId).then((conf) => {
        this.newConf = conf;
        // console.log("new conf: " + JSON.stringify(this.newConf));
        this.numDays = this.newConf.duration;
      });
    }
    else {
      this.numDays = this.newConf.duration;
    }
  }
  counter(i: number) {
    return new Array(i);
  }

  buildProgram(){
    for (let i = 0; i < this.numDays; i++){
      this.data[i] = [];
    }
    this.spinnerService.show();
    this.newConfService.buildProgram(this.confId).then((confSession) => {
      this.confSession = confSession;
      // console.log(this.confSession);
      // console.log("data: "+ JSON.stringify(this.data));
      for (let i = 0; i < this.confSession.length; i++) { // split confSessions by day
        this.data[this.confSession[i].dayNum - 1].push(this.confSession[i]);
      }
      this.newConfService.getConfById(this.confId).then((conf) => {
        this.conf = conf;
        this.conf.program = this.data;
        this.spinnerService.hide();
        console.log('conf1: ' + JSON.stringify(this.conf));
        // this.newConfService.newConf.emit(this.conf);
        // this.newConfService.setNewConf(this.conf);
        this.avialble = false;
      });
    });
  }
}
