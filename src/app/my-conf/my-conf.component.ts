import { Component, OnInit } from '@angular/core';
import { Visitor } from '../models/visitor';
import { myConfService } from '../services/myConf.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Conf } from '../models/conf';
import { Response, Headers, Http, RequestOptions, URLSearchParams, RequestOptionsArgs } from '@angular/http';
import 'rxjs/add/operator/map';
import {MatDialog} from '@angular/material';
import {NewConfProgramComponent} from '../new-conf-program/new-conf-program.component';
import {MyConfVisitorComponent} from '../my-conf-visitor/my-conf-visitor.component';
import {MyConfLectureComponent} from '../my-conf-lecture/my-conf-lecture.component';

@Component({
  selector: 'app-my-conf',
  templateUrl: './my-conf.component.html',
  styleUrls: ['./my-conf.component.css'],
})
export class MyConfComponent implements OnInit {
  visitor: Visitor;
  visitorSonId: string;
  visitorId: string;
  confId: string;
  data: any = {};
  conf: Conf;
  filesToUpload: Array<File> = [];
  confList: any =
    [
      {
        name: 'My Path',
        item: []
      },
      {
        name: 'Lecture',
        item: []
      },
      {
        name: 'Visitor',
        item: []
      }
    ];
  qrcode: any = {
    data: '',
    type: '',
    id: ''
  };
  wrongConf = false;
  getmsg: string;
  files: FileList;
  uploadfile: any = {};
  custom_path: any = {};
  fullnamevisitor: string;
  confName: string;
  panelOpenState = false;
  constructor(private myConfService: myConfService, private http: Http,
              private router: Router, private r: ActivatedRoute,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.r.queryParams
      .subscribe(params => {
        console.log('params: ' + params['type']);
        console.log('params: ' + params['id']);
        console.log('params: ' + params['data']);

        if (params.type && params.id) {
          this.qrcode.type = params.type;
          this.qrcode.id = params.id;
          this.qrcode.data = params.data;
        }
        switch (this.qrcode.type) {
          case 'lecture': this.openDialogLecture(this.qrcode.id);
          case 'visitor': this.openDialogVisitor(this.qrcode.id);
          case 'conference': console.log('conf');
          default: return 0;
        }
      });

    this.visitor = new Visitor('linkedin', 'education', 'occupation', 'qr_code');
    this.visitor = JSON.parse(localStorage.getItem('currentUser'));
    this.fullnamevisitor = this.visitor.name.first_name + ' ' + this.visitor.name.last_name;
    console.log('fullnamevisitor=' + this.fullnamevisitor);

    this.visitorId = this.visitor._id;
    this.confId = localStorage.getItem('confId');
    const currentConf =   this.visitor.confs.find(conf => conf.confId === this.confId);
    console.log(JSON.stringify(currentConf));
    this.confName = currentConf.confname;
    if (this.visitor) {
      this.myConfService.setVisitor(this.visitor);
      console.log(this.visitor);
      if (this.qrcode.type != '') {
        if (this.qrcode.type === 'lecture') {
          this.myConfService.setQRCode_lecture(this.qrcode);
        }
        else if (this.qrcode.type === 'visitor') {
          this.myConfService.setQRCode_visitor(this.qrcode);
        }
        else if (this.qrcode.type == 'conference') {
          this.myConfService.setQRCode_conf(this.qrcode);
          if (this.visitor.confs.some(x => x.confId === this.qrcode.id)) {
            localStorage.setItem('confId', this.qrcode.id);
          }
          else {
            this.wrongConf = true;
            this.qrcode.type = '';
          }
        }

      }

      if (localStorage.getItem('confId') != null)
        this.confId = localStorage.getItem('confId');
      this.myConfService.setConfId(this.confId);
      if (this.qrcode.type == 'visitor') {
        this.visitorSonId = this.qrcode.id;
        console.log('visitorSonId:  ' + this.visitorSonId);
      }
      this.myConfService.getConfById(this.confId)
        .then(conf => {
          this.conf = conf;
          // { value: 'squirtle-3', viewValue: 'Squirtle' },
          this.confList[0].item.push({
            _id: this.conf._id,
            viewValue: this.conf.name,
            type: 'conference'

          });
          // conf.viewValue = this.conf.name;
          // });
          this.confList[0].viewValue = this.conf.name;
          this.confList[1].item = this.conf.lectures;
          this.confList[1].item.forEach(lct => {
            lct.viewValue = lct.name;
            lct.type = 'lecture';
          });
          this.confList[2].item = this.conf.visitors;
          this.confList[2].item.forEach(visitor => {
            const visitorfirstname = visitor.visitorname.first_name;
            const visitorlastname = visitor.visitorname.last_name;
            const fullname = visitorfirstname + ' ' + visitorlastname;
            visitor.viewValue = fullname;
            visitor.type = 'visitor';
          });
          console.log('this is the confList');
          console.log(this.confList);
        });

    }

  }

  onSubmit(f: NgForm) {
    console.log(f.value);
    if (f.value.id && f.value.type) {
      this.qrcode.id = f.value.id;
      this.qrcode.type = f.value.type;
      this.qrcode.data = '';
      console.log('qrcode.type=' + this.qrcode.type);
      if (this.qrcode.type === 'visitor') {
        console.log('inside visitor qrcode');
        console.log('qrcode' + this.qrcode.id);
        console.log('visitor=' + JSON.stringify(this.visitor));
        this.myConfService.setVisitor(this.visitor);
        this.myConfService.setQRCode_visitor(this.qrcode);

      }
      if (this.qrcode.type === 'lecture') {
        console.log('inside lecture qrcode');
        console.log('visitor=' + JSON.stringify(this.visitor));
        this.myConfService.setVisitor(this.visitor);
        this.myConfService.setQRCode_lecture(this.qrcode);

      }
      if (this.qrcode.type === 'conference') {
        console.log('inside conference qrcode');
        localStorage.setItem('confId', this.qrcode.id);
        console.log(localStorage.getItem('confId'));

      }
    }
    else {
      console.log('bad input, no action');
    }
  }

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);
    formData.append('data', files[0], files[0]['name']);
    formData.append('type', 'profilePic');
    formData.append('id', this.visitor._id);
    console.log('form data variable :   ' + formData.toString());
    this.http.post('https://confit-backend.herokuapp.com/qrcodeApi/upload_image', formData)
      .map(files => files.json())
      .subscribe(files => {
        console.log('files', files);
        this.visitor.profilePic = files.status;
        console.log('visitor', this.visitor.profilePic);
        localStorage.setItem('currentUser', JSON.stringify(this.visitor));
      });

  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
  }


  changeUrl(selectedValue) {
    console.log(JSON.stringify(selectedValue));
    if (selectedValue.id && selectedValue.type) {
      this.qrcode.id = selectedValue._id;
      this.qrcode.type = selectedValue.type;
      this.qrcode.data = '';
    }
    if (selectedValue.type === 'visitor') {
      this.myConfService.setVisitor(this.visitor);
      this.myConfService.setQRCode_visitor(this.qrcode);
      this.router.navigate(['./'], { relativeTo: this.r, queryParams: { data: selectedValue.linkedin, type: 'visitor', id: selectedValue.visitorid } });

    }
    else if (selectedValue.type === 'conference') {
      this.router.navigate(['./'], { relativeTo: this.r, queryParams: { data: selectedValue.viewValue, type: 'conference', id: selectedValue._id } });
      localStorage.setItem('confId', this.qrcode.id);
    }
    else if (selectedValue.type === 'lecture') {
      this.router.navigate(['./'], { relativeTo: this.r, queryParams: { data: selectedValue.name, type: 'lecture', id: selectedValue._id } });
      this.myConfService.setVisitor(this.visitor);
      this.myConfService.setQRCode_lecture(this.qrcode);
    }
  }

  gotoFindFriends(){
    this.router.navigate(['./matchingPage']);
  }
  scanQr(){
    this.router.navigate(['./ScanQRCode']);
  }
  logout(){
    this.router.navigate(['./welcome']);
    localStorage.removeItem('currentUser');
  }
  openDialogVisitor(id): void {
    const dialogRefVisitor = this.dialog.open(MyConfVisitorComponent, {
      data: id
    });
    dialogRefVisitor.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.qrcode = {
        data: '',
        type: '',
        id: ''
      };
    });
  }
  openDialogLecture(id): void {
    const dialogRef = this.dialog.open(MyConfLectureComponent, {
      data: id
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.qrcode = {
        data: '',
        type: '',
        id: ''
      };
    });
  }
}
