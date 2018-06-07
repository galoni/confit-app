import {Component, Inject, OnInit} from '@angular/core';
import {NewConfService} from '../services/newConf.service';
import {EditConfSessionComponent} from '../edit-conf-session/edit-conf-session.component';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-conf-stats',
  templateUrl: './conf-stats.component.html',
  styleUrls: ['./conf-stats.component.css']
})
export class ConfStatsComponent implements OnInit {
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  //bar
  public barChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public barChartType = 'bar';
  public barChartLegend = true;
  chartHovered: any;
  chartClicked: any;
  // Doughnut
  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';
  topicsLectures: any = [];
  public barChartData: any[] = [];
  public static chartClicked(e: any): void {
    console.log(e);
  }

  public static chartHovered(e: any): void {
    console.log(e);
  }

  constructor(private newConfService: NewConfService,
              public dialogRef: MatDialogRef<EditConfSessionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.initTopic();
    this.initBarChartData();
    this.initDoughnutChart();
  }
  initTopic() {
    const topics = [];
    const tLength = this.data.main_topics.length;
    for (let tIndex = 0; tIndex < tLength; tIndex++) {// init topics array
      topics.push(this.data.main_topics[tIndex]);
      this.topicsLectures[tIndex] = [];
      this.barChartData[tIndex] = {};
      this.doughnutChartLabels.push(this.data.main_topics[tIndex]);
      this.doughnutChartData[tIndex] = 0;
    }
    for (let tIndex = 0; tIndex < tLength; tIndex++) {// loop over topic
      this.topicsLectures[tIndex] = this.data.lectures.filter(lct => lct.topic === topics[tIndex]);
    }
    // console.log('topicsLectures[i]: '+ JSON.stringify(this.topicsLectures));
  }
  initBarChartData() {
    const tLength = this.data.main_topics.length;
    let barData: any = {};
    for (let tIndex = 0; tIndex < tLength; tIndex++) {
      let sortLectures = this.topicsLectures[tIndex].sort(function(a, b) {
        return b.ratings - a.ratings;
      });
      barData.data = [];
      sortLectures.forEach((lct => {
        barData.data.push(lct.ratings);
      }));
      barData.label = this.data.main_topics[tIndex];
      Object.assign(this.barChartData[tIndex], barData);
      // this.barChartData.push(barData);
    }
    console.log('barChartData: ' + JSON.stringify(this.barChartData));
  }
  initDoughnutChart() {
    for (let i = 0; i < this.doughnutChartLabels.length; i++){
      let visitorTopic = this.data.visitors.filter(vstr => vstr.mainTopic === this.doughnutChartLabels[i]);
      this.doughnutChartData[i] = visitorTopic.length;
    }
    console.log('topic length: ' + this.doughnutChartData);
  }
}
