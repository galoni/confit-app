import {Component, Inject, OnInit} from '@angular/core';
import {NewConfService} from '../services/newConf.service';
import {EditConfSessionComponent} from '../edit-conf-session/edit-conf-session.component';
import {MAT_DIALOG_DATA, MatDialogRef, Sort} from '@angular/material';

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
  sortedData;
  //bar
  public barChartLabels: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
  public barChartType = 'bar';
  public barChartLegend = true;
  chartHovered: any;
  chartClicked: any;
  // Doughnut
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType = 'doughnut';
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
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.sortedData = this.data.lectures.slice();
  }

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
    const barData: any = {};
    for (let tIndex = 0; tIndex < tLength; tIndex++) {
      const sortLectures = this.topicsLectures[tIndex].sort(function(a, b) {
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
    for (let i = 0; i < this.doughnutChartLabels.length; i++) {
      const visitorTopic = this.data.visitors.filter(vstr => vstr.mainTopic === this.doughnutChartLabels[i]);
      this.doughnutChartData[i] = visitorTopic.length;
      const pNum = visitorTopic.length / this.data.visitors.length * 100;
      this.doughnutChartLabels[i] = this.doughnutChartLabels[i] + ' - ' + Math.floor(pNum) + '%';
    }
    console.log('topic length: ' + this.doughnutChartData);
  }
  sortData(sort: Sort) {
    const data = this.data.lectures.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'lecturer_name': return compare(a.lecturer_name, b.lecturer_name, isAsc);
        case 'ratings': return compare(+a.ratings, +b.ratings, isAsc);
        case 'topic': return compare(a.topic, b.topic, isAsc);
        default: return 0;
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
