import {Component, ElementRef, OnInit, ViewChild, Output, EventEmitter} from '@angular/core';
import { NewConfService } from '../services/newConf.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Conf} from '../models/conf';
import {Manager} from '../models/manager';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-new-conf-details',
  templateUrl: './new-conf-details.component.html',
  styleUrls: ['./new-conf-details.component.css']
})
export class NewConfDetailsComponent implements OnInit {
  data: any= {};
  conf: Conf;
  manager: Manager;
  managerId: string;
  confType: string;
  confAudience: string;
  @ViewChild('stepper') stepper;
  @Output() onStatusChange = new EventEmitter<boolean>();
  step = 0;

  types = [
    {value: 'academic-0', viewValue: 'academic'},
    {value: 'technology-1', viewValue: 'technology'}
  ];
  audiences = [
    {value: 'student-0', viewValue: 'student'},
    {value: 'B.A-0', viewValue: 'B.A'}
  ];
  optionTopics = [
    'Web',
    'Big data',
    'IOT'
  ];
  filteredOptions: Observable<string[]>;

  constructor(private newConfService: NewConfService,
              private router: Router, private r: ActivatedRoute) { }

  ngOnInit() {
    this.manager = JSON.parse(localStorage.getItem('currentUser'));
    this.managerId = this.manager._id;
    this.data.main_topics = [];
    localStorage.removeItem('confSessions');
    localStorage.removeItem('timeTable');
    localStorage.removeItem('lectures');
    localStorage.removeItem('confLectures');
  }
  createConference(form: NgForm) {
    this.data.name = form.value.name;
    this.data.type = form.value.type;
    this.data.logo = form.value.logo;
    this.data.start_date = form.value.start_date;
    this.data.duration = form.value.duration;
    this.data.location = form.value.location;
    this.data.audience = form.value.audience;
    this.data.main_topics.push(form.value.topic1);
    this.data.main_topics.push(form.value.topic2);
    this.data.main_topics.push(form.value.topic3);
    this.data.managerId = this.managerId;
    this.newConfService.createConference(this.data).then((conf) => {
      if (conf){
        this.conf = conf;
        // console.log("emit: " + this.conf);
        // this.newConfService.newConf.emit(this.conf);
        this.newConfService.setNewConf(conf);
        localStorage.setItem('confId', this.conf._id);
        localStorage.setItem('confDuration', (this.data.duration).toString());
        console.log(this.conf._id);
        // this.changeStep(2);
        // this.router.navigate(['../sessions'], { relativeTo: this.r });
        this.onStatusChange.emit(true);
      }
      else {
        console.log('error');
      }
    });
    this.data.main_topics = [];
  }
  changeStep(index: number) {
    this.stepper.selectedIndex = index;
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
