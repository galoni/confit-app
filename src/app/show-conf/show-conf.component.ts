import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { NewConfService } from '../services/newConf.service';
import { ManagerService } from '../services/manager.service';
import { ConfSession } from '../models/confSession';
import { ActivatedRoute, Router } from '@angular/router';
import { Conf } from '../models/conf';
import { Lecture } from '../models/lecture';
import {Subscription} from 'rxjs/Subscription';
import {NewConfSessionsComponent} from '../new-conf-sessions/new-conf-sessions.component';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {EditConfSessionComponent} from '../edit-conf-session/edit-conf-session.component';
import {NewConfProgramComponent} from '../new-conf-program/new-conf-program.component';
import {ConfStatsComponent} from '../conf-stats/conf-stats.component';
import {LandingService} from '../services/landing.service';
import {Http} from '@angular/http';

@Component({
  selector: 'app-show-conf',
  templateUrl: './show-conf.component.html',
  styleUrls: ['./show-conf.component.css']
})
export class ShowConfComponent implements OnInit {
  confId: string;
  managerId: string;
  confSession: ConfSession[];
  lectures: Lecture[] = [];
  data: any = [];
  avialble = true;
  @Input() conf: Conf;
  subscription: Subscription;
  selectedConf: Conf;
  confSessions: ConfSession[][] = [];
  filesToUpload: Array<File> = [];
  @Output() onConfRemove = new EventEmitter<Conf>();

  constructor(private newConfService: NewConfService,
              private managerService: ManagerService,
              private landingService: LandingService,
              public dialog: MatDialog,
              private http: Http,
              private router: Router, private r: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('conf: ' + this.conf);
    this.initData(this.conf);
    // this.managerId = '5ade1e1ef1c8043984217fe8';
    // this.subscription = this.managerService.selectedConf$
    //   .subscribe(conf => {
    //     this.conf = <Conf>this.deepCopy(conf);
    //     // console.log('sub conf: ' + JSON.stringify(this.conf.program));
    //   });
    // // console.log('new conf: ' + JSON.stringify(this.conf));
    // // this.confId = this.selectedConf._id;
    // // this.conf = <Conf>this.deepCopy(this.fConf);
    // if (!this.conf) {
    //   this.confId = '5aeb7d196226470004135c4c';
    //   this.newConfService.getConfById(this.confId).then((conf) => {
    //     this.conf = conf;
    //     // console.log('the conf2: ' + JSON.stringify(this.conf));
    //     this.initData(conf);
    //     // this.newConfService.newConf.emit(this.conf);
    //   });
    // }
    // else {
    //   // console.log('the conf: ' + JSON.stringify(this.conf));
    //   this.initData(this.conf);
    //   this.landingService.setSelectedConf(this.conf);
    // }
    // console.log(this.confId);
  }

  initData(conf) {
    for (let i = 0; i < conf.duration; i++) {
      this.data[i] = [];
    }
    this.confSession = conf.program;
    // console.log(this.conf.program);
    // console.log("data: "+ JSON.stringify(this.data));
    for (let i = 0; i < conf.program.length; i++) {
      this.data[conf.program[i].dayNum - 1].push(conf.program[i]);
    }
    this.conf.program = this.data;
    this.avialble = false;
  }

  openDialogSess(): void {
    // console.log('dig conf: ' + JSON.stringify(this.conf));
    let dialogRef = this.dialog.open(EditConfSessionComponent, {
      width: '830px',
      data: this.conf
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:' + JSON.stringify(result));
      // this.confSession = result;
    });
  }

  openDialogProg(): void {
    // console.log('dig conf: ' + JSON.stringify(this.conf));
    let dialogRef = this.dialog.open(NewConfProgramComponent, {
      width: '1030px',
      data: this.conf
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.conf = result;
    });
  }

  openDialogStats(): void {
    // console.log('dig conf: ' + JSON.stringify(this.conf));
    let dialogRef = this.dialog.open(ConfStatsComponent, {
      width: '830px',
      data: this.conf
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.conf = result;
    });
  }

  removeConf() {
    this.managerService.removeConf(this.managerId, this.conf._id).then((conf) => {
      console.log('delete: ' + JSON.stringify(this.conf));
      this.onConfRemove.emit(this.conf);
      this.conf = null;
    });
  }

  landClick() {
    localStorage.setItem('showConf', JSON.stringify(this.conf));
    this.router.navigate(['./landingPage']);
  }

  getMyStyles() {
    let myStyles = {
      'background-image': 'url(\'http://logo-storage.s3.amazonaws.com/' + this.conf.logo + '\')',
      'background-size': 'cover',
      'background-repeat': 'no-repeat'
    };
    return myStyles;
  }

  upload() {
    let confId = this.conf._id;
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);
    formData.append("data", files[0], files[0]['name']);
    formData.append('type', 'logo');
    formData.append('id', confId);
    console.log('form data variable :   ' + formData.toString());
    this.http.post('https://confit-backend.herokuapp.com/qrcodeApi/upload_image', formData)
      .map(files => files.json())
      .subscribe(files => {
        console.log('files', files);
        // this.visitor.profilePic = files.status;
        // console.log('visitor', this.visitor.profilePic);
        // localStorage.setItem('currentUser', JSON.stringify(this.visitor));
      });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
  }
}
