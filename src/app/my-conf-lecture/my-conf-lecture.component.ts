import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-conf-lecture',
  templateUrl: './my-conf-lecture.component.html',
  styleUrls: ['./my-conf-lecture.component.css']
})
export class MyConfLectureComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // this.myConfService.getVisitorById(this.visitorId).then((visitor) => {
    //   if (visitor) {
    //     this.myConfService.visitorSelected.emit(visitor);
    //   }});
  }

}