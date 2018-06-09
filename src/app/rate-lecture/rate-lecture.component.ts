import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditConfSessionComponent} from '../edit-conf-session/edit-conf-session.component';
import {Conf} from '../models/conf';
import {myConfService} from '../services/myConf.service';

@Component({
  selector: 'app-rate-lecture',
  templateUrl: './rate-lecture.component.html',
  styleUrls: ['./rate-lecture.component.css']
})
export class RateLectureComponent implements OnInit {
  dataRate: any = {};
  lecture: any;
  lecturer: any;
  match: any;

  constructor(private myConfService: myConfService,
              public dialogRef: MatDialogRef<EditConfSessionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log('lecture: ' + JSON.stringify(this.data));
  }
  rate(lecture, lecturer, match) {
    this.dataRate.lectureId = this.data._id;
    const incNum = Math.floor((lecture + lecturer + match) / 3);
    this.dataRate.incNum = incNum;
    this.myConfService.rateLecture(this.dataRate).then((data) => {
      console.log('data return: ' + JSON.stringify(data));
      this.dialogRef.close();
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
