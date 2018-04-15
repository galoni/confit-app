import { Component, OnInit, Input } from '@angular/core';
import { NewConfService } from "../services/newConf.service";
import { ConfSession } from "../models/confSession";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Conf} from "../models/conf";

@Component({
  selector: 'app-new-conf-program-show',
  templateUrl: './new-conf-program-show.component.html',
  styleUrls: ['./new-conf-program-show.component.css']
})
export class NewConfProgramShowComponent implements OnInit {
  data: any = [];
  topicsLectures:any = [];
  subscription:Subscription;
  @Input() fConf:Conf;

  constructor(private newConfService: NewConfService,
              private router: Router, private r:ActivatedRoute) { }

  ngOnInit() {
    this.data = this.fConf.program;
    // console.log("data: "+ JSON.stringify(data));
    let topics = [];
    let tLength = this.fConf.main_topics.length;
    for (let tIndex = 0; tIndex < tLength; tIndex++){//init topics array
      topics.push(this.fConf.main_topics[tIndex]);
      this.topicsLectures[tIndex] = [];
    }
    console.log("topicsLectures: " + JSON.stringify(this.topicsLectures));
    console.log("topics: " + JSON.stringify(topics));
    for (let i = 0; i < this.data.length; i++){//loop over days
      for(let j = 0; j < this.data[i].length; j++){//loop over session
        for (let tIndex = 0; tIndex < tLength; tIndex++){//loop over topic
          this.topicsLectures[tIndex] = this.data[i][j].lectures.filter(lct => lct.topic === topics[tIndex]);
          // console.log("data[i][j]: "+ JSON.stringify(this.topicsLectures));
        }
        // console.log("topicsLectures: " + JSON.stringify(this.topicsLectures));
        this.data[i][j].lectures = [];
        for (let tIndex = 0; tIndex < tLength; tIndex++){
          this.data[i][j].lectures[tIndex] = this.topicsLectures[tIndex];
        }
      }
    }
    console.log("super data: " + JSON.stringify(this.data));
    //
    // this.newConfService.newConf.subscribe((data:any)=>{
    //   this.data = data.program;
    //   // console.log("data: "+ JSON.stringify(data));
    //   let topics = [];
    //   let tLength = data.main_topics.length;
    //   for (let tIndex = 0; tIndex < tLength; tIndex++){//init topics array
    //     topics.push(data.main_topics[tIndex]);
    //     this.topicsLectures[tIndex] = [];
    //   }
    //   console.log("topicsLectures: " + JSON.stringify(this.topicsLectures));
    //   console.log("topics: " + JSON.stringify(topics));
    //   for (let i = 0; i < this.data.length; i++){//loop over days
    //     for(let j = 0; j < this.data[i].length; j++){//loop over session
    //       for (let tIndex = 0; tIndex < tLength; tIndex++){//loop over topic
    //         this.topicsLectures[tIndex] = this.data[i][j].lectures.filter(lct => lct.topic === topics[tIndex]);
    //         // console.log("data[i][j]: "+ JSON.stringify(this.topicsLectures));
    //       }
    //       // console.log("topicsLectures: " + JSON.stringify(this.topicsLectures));
    //       this.data[i][j].lectures = [];
    //       for (let tIndex = 0; tIndex < tLength; tIndex++){
    //         this.data[i][j].lectures[tIndex] = this.topicsLectures[tIndex];
    //       }
    //     }
    //   }
    //   console.log("super data: " + JSON.stringify(this.data));
    // });
  }

}
