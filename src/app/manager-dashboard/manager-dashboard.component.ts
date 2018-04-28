import { Component, OnInit } from '@angular/core';
import { Manager} from '../models/manager';
import { Conf } from '../models/conf';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent implements OnInit {
  manager: Manager;
  managerId: string;
  rows: Conf[][] = [];
  confs: Conf[];

  constructor(private managerService: ManagerService) { }

  ngOnInit() {
    this.managerId = '5ade1e1ef1c8043984217fe8';
    this.managerService.getAllConfById(this.managerId).then((cnfs) => {
      console.log('confs: ' + JSON.stringify(cnfs));
      this.confs = cnfs;
      this.rows = [];
      for (let i = 0; i < this.numRows(); i++) {
        this.rows.push(this.getRow(i));
        }
    });
  }

  numRows(): number {
    return Math.max(Math.ceil((this.confs.length) / 4), 0);
  }

  getRow(i: number) {
    const startIndex = (i) * 4;
    return this.confs.slice(startIndex, startIndex + 4);
  }

}
