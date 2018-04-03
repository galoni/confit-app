import { Component, OnInit } from '@angular/core';
import { NewConfService } from "../services/newConf.service";
import { Lecture } from "../models/lecture";
import {NgForm} from "@angular/forms";

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

  constructor(private newConfService: NewConfService) { }

  ngOnInit() {
    this.newConfService.getAllLectures().then((lectures)=>{
      console.log(lectures);
      this.lectures = lectures;
    })
  }
  addLecture(){
    this.confLectures.push(this.selectedLecture);
    const index: number = this.lectures.indexOf(this.selectedLecture);
    if (index !== -1) {
      this.lectures.splice(index, 1);
    }
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
    this.newConfService.createLecture(this.data).then((lct) => {
      console.log(lct);
      this.lectures.push(lct);
    });
  }
}
