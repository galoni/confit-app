import { Component, OnInit,Input } from '@angular/core';
import { Visitor } from "../models/visitor";
import { myConfService } from "../services/myConf.service";

@Component({
  selector: 'app-pie-chart-data',
  templateUrl: './pie-chart-data.component.html',
  styleUrls: ['./pie-chart-data.component.css']
})
export class PieChartDataComponent implements OnInit {
  public pieChartLabels:string[] = ['Learn Percent', 'Connection Percent', 'Explore Percent'];
  public pieChartType:string = 'pie';
  public pieChartData:number[] = [];
  connection:number;
  explore:number;
  learn:number;
  confId: string;
  visitor:Visitor;
  pieChartColor:any = [
    {
        backgroundColor: ['rgb(155, 237, 196)',
        'rgba(240, 111, 175, 0.3)',
        'rgba(111, 175, 240, 0.57)'
        ]
    }
]

@Input() visitorId:string;
  constructor(private myConfService: myConfService) { }

  ngOnInit() {
    this.confId=localStorage.getItem('confId');
    console.log(this.confId);
    this.myConfService.getVisitorById(this.visitorId).then((visitor) => {
      if (visitor) {
        this.visitor=visitor;
        console.log(this.visitor);
        for(let i=0;i<this.visitor.confs.length;i++){
          if(this.visitor.confs[i].confId===this.confId){
            this.connection=this.visitor.confs[i].connection_precent;
            this.learn=this.visitor.confs[i].learn_precent;
            this.explore=this.visitor.confs[i].explore_precent;
          }
          else{
            console.log("there is no active conf");
          }
        }
        this.pieChartData=[this.learn,this.connection,this.explore];

      }});




  }


}
