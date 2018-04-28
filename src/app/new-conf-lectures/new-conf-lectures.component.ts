import { Component, OnInit } from '@angular/core';
import { NewConfService } from "../services/newConf.service";
import { Lecture } from "../models/lecture";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Conf} from "../models/conf";
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-new-conf-lectures',
  templateUrl: './new-conf-lectures.component.html',
  styleUrls: ['./new-conf-lectures.component.css']
})
export class NewConfLecturesComponent implements OnInit {
  lectures: Lecture[];
  selectedLecture: Lecture = null;
  confLectures: Lecture[]=[];
  data:any= {};
  confId:string;
  confTopics: string[]=[];
  newConf: Conf;
  topics:string[]=["Web", "IOT", "Big Data"];
  subscription:Subscription;

  constructor(private newConfService: NewConfService,
              private router: Router, private r:ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.newConfService.newConf$
      .subscribe(conf => this.newConf = conf);
    if (this.newConf.main_topics.length > 0) {
      this.topics = [];
      for (let i = 0; i < this.newConf.main_topics.length; i++){
        this.topics.push(this.newConf.main_topics[i]);
        // console.log("topic: " + this.topics);
      }
    }
    // this.newConf.lectures=[];
    // this.newConfService.newConf.subscribe((conf:Conf)=>{
    //   this.newConf = conf;
    //   console.log("newConf: " + JSON.stringify(this.newConf));
    //   this.topics = [];
    //   for(let i = 0; i < this.newConf.main_topics.length; i++){
    //     this.topics.push(this.newConf.main_topics[i]);
    //     console.log("topic: " + this.topics);
    //   }
    // });
    // if (!this.newConf){
    //   this.topics = ["Web-D", "IOT-D", "Big Data-D"];
    // }
    console.log("topic: " + this.topics);
    this.confId = this.newConf._id;
    this.lectures = JSON.parse(localStorage.getItem('lectures'));
    if(!this.confId) {
      console.log("no new conf");
      this.confId = "5ad3db7e42dd9425ecb5fc49";
      this.newConfService.getConfById(this.confId).then((conf) => {
        this.newConf = conf;
      });
    }
    if(this.lectures){
      console.log("found stash");
      this.confLectures = JSON.parse(localStorage.getItem('confLectures'))
    }
    else{
      this.newConfService.getAllLecturesByTopic(this.topics).then((lectures)=>{
        console.log(lectures);
        this.lectures = lectures;
      })
    }
  }
  addAll(){
    for (let i = 0; i < this.lectures.length; i++){
      this.confLectures.push(this.lectures[i]);
    }
    this.lectures = [];
  }
  removeAll(){
    for (let i = 0; i < this.confLectures.length; i++){
      this.lectures.push(this.confLectures[i]);
    }
    this.confLectures = [];
  }
  addLecture(){
    this.confLectures.push(this.selectedLecture);
    const index: number = this.lectures.indexOf(this.selectedLecture);
    if (index !== -1) {
      this.lectures.splice(index, 1);
    }
    this.selectedLecture = null;
  }
  removeLecture(lct){
    this.lectures.push(lct);
    const index: number = this.confLectures.indexOf(lct);
    if (index !== -1) {
      this.confLectures.splice(index, 1);
    }
  }
  createLecture(form: NgForm) {
    this.data.name = form.value.name;
    this.data.lecturer_name = form.value.lecturer_name;
    this.data.description = form.value.description;
    this.data.ratings = form.value.ratings;
    this.data.lectures = [];
    console.log("data: " + this.data.topic);
    this.newConfService.createLecture(this.data).then((lct) => {
      console.log(lct);
      this.lectures.push(lct);
    });
  }
  addManyLectures(){
    console.log(this.confLectures);
    // for (let i = 0; i < this.confLectures.length; i++){ //calculate all topics
    //   console.log("i: " + this.confLectures[i].topic.length);
    //   for (let j = 0; j < this.confLectures[i].topic.length; j++){
    //     if(this.confTopics.indexOf(this.confLectures[i].topic[j]) === -1){
    //       this.confTopics.push(this.confLectures[i].topic[j]);
    //     }
    //   }
    // }
    // console.log("conf topics: " + this.confTopics);
    // for(let i = 0; i < this.confLectures.length; i++){
    //   this.newConf.lectures.push(this.confLectures[i]);
    // }
    console.log("newConf: " + this.newConf);
    this.newConfService.addManyLectures(this.confLectures, this.confId, this.confTopics).then((conf) =>{
      console.log(conf);
      localStorage.setItem('lectures', JSON.stringify(this.lectures));
      localStorage.setItem('confLectures', JSON.stringify(this.confLectures));
      this.newConfService.setNewConf(this.newConf);
      this.router.navigate(["../program"], { relativeTo: this.r });
    });
  }
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
