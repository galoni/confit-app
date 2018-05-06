import { Component, OnInit, Input } from '@angular/core';
import { NewConfService } from '../services/newConf.service';
import { ConfSession } from '../models/confSession';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Conf} from '../models/conf';
import {ManagerService} from '../services/manager.service';

@Component({
  selector: 'app-new-conf-program-show',
  templateUrl: './new-conf-program-show.component.html',
  styleUrls: ['./new-conf-program-show.component.css']
})
export class NewConfProgramShowComponent implements OnInit {
  data: any = [];
  topicsLectures: any = [];
  subscription: Subscription;
  @Input() fConf: Conf;
  conf: Conf;

  constructor(private managerService: ManagerService,
              private router: Router, private r: ActivatedRoute) { }

  ngOnInit() {
    // this.subscription = this.managerService.selectedConf$
    //   .subscribe(conf => this.conf = conf);
    // if (this.conf) {
    //   console.log('conf: ' + JSON.stringify(this.conf.program));
    //   this.data = this.conf.program;
    // }
    // console.log('fConf: ' + JSON.stringify(this.fConf.program));
    Object.assign(this.data, this.fConf.program);
    this.conf = <Conf>this.deepCopy(this.fConf);
    const topics = [];
    const tLength = this.fConf.main_topics.length;
    for (let tIndex = 0; tIndex < tLength; tIndex++) {// init topics array
      topics.push(this.fConf.main_topics[tIndex]);
      this.topicsLectures[tIndex] = [];
    }
    console.log('topicsLectures: ' + JSON.stringify(this.topicsLectures));
    console.log('topics: ' + JSON.stringify(topics));
    for (let i = 0; i < this.data.length; i++) {// loop over days
      for (let j = 0; j < this.data[i].length; j++) {// loop over session
        for (let tIndex = 0; tIndex < tLength; tIndex++) {// loop over topic
          this.topicsLectures[tIndex] = this.data[i][j].lectures.filter(lct => lct.topic === topics[tIndex]);
          // console.log("data[i][j]: "+ JSON.stringify(this.topicsLectures));
        }
        // console.log("topicsLectures: " + JSON.stringify(this.topicsLectures));
        this.data[i][j].lectures = [];
        for (let tIndex = 0; tIndex < tLength; tIndex++) {
          this.data[i][j].lectures[tIndex] = this.topicsLectures[tIndex];
        }
      }
    }
    // console.log('fConf: ' + JSON.stringify(this.fConf.program));
  }
  deepCopy(obj) {
    let copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || 'object' !== typeof obj) { return obj; }

    // Handle Date
    if (obj instanceof Date) {
      copy = new Date();
      copy.setTime(obj.getTime());
      return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
      copy = [];
      for (let i = 0, len = obj.length; i < len; i++) {
        copy[i] = this.deepCopy(obj[i]);
      }
      return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
      copy = {};
      for (const attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = this.deepCopy(obj[attr]);
      }
      return copy;
    }

    throw new Error('Unable to copy obj! Its type isn\'t supported.');
  }
}
