import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  public pieChartLabels:string[] = ['Learn Percent', 'Connection Percent', 'Explore Percent'];
  public pieChartType:string = 'pie';
  data:any;
  @Input() connection:number;
  @Input() learn:number;
  @Input() explore:number;
  public pieChartData:number[] = [];
  constructor() { }

  ngOnInit() {
    this.pieChartData=[this.learn,this.connection,this.explore];
    }

}
