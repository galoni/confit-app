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
  confs: Conf[];
  conf: Conf;

  constructor(private managerService: ManagerService) { }

  ngOnInit() {
    this.managerId = '5ade1e1ef1c8043984217fe8';
    this.managerService.getAllConfById(this.managerId).then((cnfs) => {
      console.log('Num confs: ' + cnfs.length);
      this.confs = cnfs;
    });
  }

  showInfo(conf) {
    // console.log('selected conf: ' + JSON.stringify(conf.program));
    this.managerService.setSelectedConf(conf);
    this.conf = conf;
  }

  confRemoved(conf) {
    console.log('remove conf: ' + JSON.stringify(conf));
    //const index: number = this.confs.findIndex(conf);
    //console.log('index: ' + index);
    //if (index !== -1) {
    //  this.confs.splice(index, 1);
    //}
    var f;
    var found = this.confs.some(function(conf, index) { f = index; return conf._id == conf._id; });

    if (!found) {
        return false;
    }

    this.confs.splice(f, 1);
    console.log('confs num: ' + this.confs.length);
  }
}
