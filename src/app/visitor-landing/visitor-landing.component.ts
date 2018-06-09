import { Component, OnInit } from '@angular/core';
import { Visitor } from '../models/visitor';
import { myConfService } from '../services/myConf.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Conf } from '../models/conf';
import {MatDialog} from '@angular/material';
import {NewConfProgramComponent} from '../new-conf-program/new-conf-program.component';
import {NewConfService} from '../services/newConf.service';
import {VisitorService} from '../services/visitor.service';

@Component({
  selector: 'app-visitor-landing',
  templateUrl: './visitor-landing.component.html',
  styleUrls: ['./visitor-landing.component.css']
})
export class VisitorLandingComponent implements OnInit {
  visitor: Visitor;
  visitorId: string;
  panelOpenState = false;
  selected: string;
  confactive: string;
  conf: Conf;
  confs: Conf[];

  constructor(private myConfService: myConfService,
              private newConfService: NewConfService,
              private visitorService: VisitorService,
              public dialog: MatDialog,
              private router: Router,
              private r: ActivatedRoute) { }

  ngOnInit() {
    this.visitor = JSON.parse(localStorage.getItem('currentUser'));
    console.log('visitor: ' + JSON.stringify(this.visitor));
    this.visitorId = this.visitor._id;
    this.visitorService.getAllConfById(this.visitorId).then((cnfs) => {
      console.log('Num confs: ' + cnfs.length);
      this.confs = cnfs;
      this.visitor.confs = cnfs;
      localStorage.setItem('currentUser', JSON.stringify(this.visitor));
    });
  }
  activeConf(confactive: string) {
    localStorage.setItem('confId', confactive);
    this.selected = confactive;
    this.newConfService.getConfById(confactive).then((cnf) => {
      this.conf = cnf;
    });
    this.router.navigate(['./MyConference']);
  }
  isActive(confid) {
    this.confactive = localStorage.getItem('confId');
    return this.confactive === confid;
  }
  openDialogProg(): void {
    // console.log('dig conf: ' + JSON.stringify(this.conf));
    const dialogRef = this.dialog.open(NewConfProgramComponent, {
      width: '830px',
      data: this.conf
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.conf = result;
    });
  }
}
