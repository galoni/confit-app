import { Component, OnInit } from '@angular/core';
import { NewConfService } from "../services/newConf.service";
import { Lecture } from "../models/lecture";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

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
  constructor(private newConfService: NewConfService,
              private router: Router, private r:ActivatedRoute) { }

  ngOnInit() {
    this.data.topics = [];
    this.confId = localStorage.getItem('confId');
    this.lectures = JSON.parse(localStorage.getItem('lectures'));
    if (this.confId){
      console.log("confId: " + this.confId);
    }
    if(this.lectures){
      console.log("found stash");
      this.confLectures = JSON.parse(localStorage.getItem('confLectures'))
    }
    else{
      this.newConfService.getAllLectures().then((lectures)=>{
        console.log(lectures);
        this.lectures = lectures;
      })
    }
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
    this.data.duration = form.value.duration;
    this.data.description = form.value.description;
    this.data.ratings = form.value.ratings;
    this.data.topics.push(form.value.topic1);
    this.data.topics.push(form.value.topic2);
    this.data.topics.push(form.value.topic3);
    this.data.lectures = [];
    console.log("data: " + this.data.topics);
    this.newConfService.createLecture(this.data).then((lct) => {
      console.log(lct);
      this.lectures.push(lct);
      this.data.topics = [];
    });
  }
  addManyLectures(){
    console.log(this.confLectures);
    for (let i = 0; i < this.confLectures.length; i++){

    }
    this.newConfService.addManyLectures(this.confLectures, this.confId).then((conf) =>{
      console.log(conf);
      localStorage.setItem('lectures', JSON.stringify(this.lectures));
      localStorage.setItem('confLectures', JSON.stringify(this.confLectures));
      this.router.navigate(["../sessions"], { relativeTo: this.r });
    });
  }
}
