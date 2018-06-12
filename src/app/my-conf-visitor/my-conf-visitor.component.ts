import {Component, Output, OnInit, Input, EventEmitter, Inject} from '@angular/core';
import { myConfService } from '../services/myConf.service';
import { Visitor } from '../models/visitor';
import { ActivatedRoute, Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditConfSessionComponent} from '../edit-conf-session/edit-conf-session.component';

@Component({
  selector: 'app-my-conf-visitor',
  templateUrl: './my-conf-visitor.component.html',
  styleUrls: ['./my-conf-visitor.component.css']
})
export class MyConfVisitorComponent implements OnInit {
  confId: string;
  visitorSon: Visitor;
  visitor: Visitor;
  loadedVisitor = true;
  visitorId: string;
  percent: number;
  biggestnumber: number;
  smallestnumber: number;
  qrcode: any = {};
  // @Input() visitorChild: Visitor;
  // @Input() visitorSonId: string;
  constructor(private myConfService: myConfService,
              private router: Router, private r: ActivatedRoute,
              public dialogRef: MatDialogRef<MyConfVisitorComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    console.log('data : ' + this.data);
    this.visitorSon = new Visitor('linkedin', 'education1', 'occupation', 'qr_code');
    this.visitor = JSON.parse(localStorage.getItem('currentUser'));
    console.log('visitor : ' + JSON.stringify(this.visitor));
    this.confId = localStorage.getItem('confId');
    this.myConfService.getVisitorById(this.data).then((visitor) => {
      this.visitorSon = visitor;
      console.log('visitorSon : ' + JSON.stringify(this.visitorSon));
      const indexofconf_visitor = this.visitor.confs.map(function(e) { return e.confId; }).indexOf(this.confId);
      const indexofconf_visitorSon = this.visitorSon.confs.map(function(e) { return e.confId; }).indexOf(this.confId);
      if ((indexofconf_visitor !== -1) && (indexofconf_visitorSon !== -1)) {
        console.log('same confs');
        this.smallestnumber = Math.min(this.visitorSon.confs[indexofconf_visitorSon].profile_pie, this.visitor.confs[indexofconf_visitor].profile_pie);
        this.biggestnumber = Math.max(this.visitorSon.confs[indexofconf_visitorSon].profile_pie, this.visitor.confs[indexofconf_visitor].profile_pie);
        console.log(this.smallestnumber);
        console.log(this.biggestnumber);
        this.percent = Math.floor((this.smallestnumber / this.biggestnumber) * 100);
        console.log(this.percent);
        this.loadedVisitor = false;
      }
      else {
        console.log('Not on the same conference');
      }
    });
  }
}
