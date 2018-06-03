import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { NewConfService } from '../services/newConf.service';
import { Lecture } from '../models/lecture';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Conf} from '../models/conf';
import {Subscription} from 'rxjs/Subscription';
import {MatTableDataSource} from '@angular/material';
import {LandingService} from '../services/landing.service';

@Component({
  selector: 'app-new-conf-lectures',
  templateUrl: './new-conf-lectures.component.html',
  styleUrls: ['./new-conf-lectures.component.css']
})
export class NewConfLecturesComponent implements OnInit {
  lectures: Lecture[];
  selectedLecture: Lecture = null;
  confLectures: Lecture[]= [];
  data: any= {};
  confId: string;
  confTopics: string[]= [];
  newConf: Conf;
  topics: string[]= ['Web', 'IOT', 'Big Data'];
  subscription: Subscription;
  displayedColumns = ['name', 'lecturer_name', 'remove'];
  private dataSource: MatTableDataSource<Lecture>;
  tempConfs:  Lecture[]= [];

  constructor(private newConfService: NewConfService,
              private landingService: LandingService,
              private router: Router, private r: ActivatedRoute,
              private changeDetectorRefs: ChangeDetectorRef) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.confLectures);
    this.dataSource.connect();
    this.subscription = this.newConfService.newConf$
      .subscribe(conf => this.newConf = conf);
    if (this.newConf.main_topics.length > 0) {
      this.topics = [];
      for (let i = 0; i < this.newConf.main_topics.length; i++){
        this.topics.push(this.newConf.main_topics[i]);
        // console.log("topic: " + this.topics);
      }
    }
    console.log('topic: ' + this.topics);
    this.confId = this.newConf._id;
    this.lectures = JSON.parse(localStorage.getItem('lectures'));
    if (!this.confId) {
      console.log('no new conf');
      this.confId = '5ad3db7e42dd9425ecb5fc49';
      this.newConfService.getConfById(this.confId).then((conf) => {
        this.newConf = conf;
      });
    }
    if (this.lectures) {
      console.log('found stash');
      this.confLectures = JSON.parse(localStorage.getItem('confLectures'));
    }
    else {
      this.newConfService.getAllLecturesByTopic(this.topics).then((lectures) => {
        console.log(lectures);
        this.lectures = lectures;
      });
    }
  }
  updateTable(){
    for (let i = 0; i < this.confLectures.length; i++){
      this.tempConfs.push(this.confLectures[i]);
    }
    this.confLectures = [];
    this.tempConfs.push(this.selectedLecture);
    for (let i = 0; i < this.tempConfs.length; i++){
      this.confLectures.push(this.tempConfs[i]);
    }
    this.tempConfs = [];
  }
  addAll() {
    this.removeAll();
    for (let i = 0; i < this.lectures.length; i++){
      this.confLectures.push(this.lectures[i]);
    }
    this.lectures = [];
    this.changeDetectorRefs.detectChanges();
  }
  removeAll() {
    for (let i = 0; i < this.confLectures.length; i++){
      this.lectures.push(this.confLectures[i]);
    }
    this.confLectures = [];
  }
  addLecture() {
    this.updateTable();
    const index: number = this.lectures.indexOf(this.selectedLecture);
    if (index !== -1) {
      this.lectures.splice(index, 1);
    }
    this.selectedLecture = null;
  }
  removeLecture(lct) {
    this.lectures.push(lct);
    for (let i = 0; i < this.confLectures.length; i++){
      this.tempConfs.push(this.confLectures[i]);
    }
    this.confLectures = [];
    const index: number = this.tempConfs.indexOf(lct);
    if (index !== -1) {
      this.tempConfs.splice(index, 1);
    }
    for (let i = 0; i < this.tempConfs.length; i++){
      this.confLectures.push(this.tempConfs[i]);
    }
    this.tempConfs = [];
  }
  createLecture(form: NgForm) {
    this.data.name = form.value.name;
    this.data.lecturer_name = form.value.lecturer_name;
    this.data.description = form.value.description;
    this.data.ratings = form.value.ratings;
    this.data.lectures = [];
    console.log('data: ' + this.data.topic);
    this.newConfService.createLecture(this.data).then((lct) => {
      console.log(lct);
      this.lectures.push(lct);
    });
    this.changeDetectorRefs.detectChanges();
  }
  addManyLectures(){
    console.log(this.confLectures);
    console.log('newConf: ' + this.newConf);
    this.newConfService.addManyLectures(this.confLectures, this.confId, this.confTopics).then((conf) => {
      console.log(conf);
      localStorage.setItem('lectures', JSON.stringify(this.lectures));
      localStorage.setItem('confLectures', JSON.stringify(this.confLectures));
      this.newConfService.setNewConf(this.newConf);
      //this.router.navigate(['../program'], { relativeTo: this.r });
    });
  }
  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
