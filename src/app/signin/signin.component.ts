import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserAuthService } from '../services/user-auth.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditConfSessionComponent} from '../edit-conf-session/edit-conf-session.component';
import {ManagerService} from '../services/manager.service';
import {Manager} from '../models/manager';
import {Router} from '@angular/router';
import {AlertService} from '../services/alert.service';
import {VisitorService} from '../services/visitor.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  manager: Manager;
  myForm: FormGroup;
  error = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private userauthService: UserAuthService,
              public dialogRef: MatDialogRef<EditConfSessionComponent>,
              private managerService: ManagerService,
              private visitorService: VisitorService,
              private alertService: AlertService,
              public router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit():any {
      this.myForm = this.fb.group({
          email: ['', Validators.required],
          password: ['', Validators.required],
      });
  }
  onSignin() {
    // this.userauthService.signinUser(this.myForm.value);
    if (this.data) {
      this.managerService.login(this.myForm.value).then((man) => {
        if (man._id) {
          console.log('current manager: ' + JSON.stringify(man));
          localStorage.setItem('currentUser', JSON.stringify(man));
          this.manager = JSON.parse(localStorage.getItem('currentUser'));
          console.log(this.manager._id);
          this.router.navigate(['./dashboard']);
        }
        else {
          console.log('wrong: ' + JSON.stringify(man));
          this.alertService.error(JSON.stringify(man));
        }
      });
    }
    else {
      this.visitorService.login(this.myForm.value).then((man) => {
        if (man._id) {
          console.log('current visitor: ' + JSON.stringify(man));
          localStorage.setItem('currentUser', JSON.stringify(man));
          this.manager = JSON.parse(localStorage.getItem('currentUser'));
          console.log(this.manager._id);
          this.router.navigate(['./visitorlanding']);
        }
        else {
          console.log('wrong: ' + JSON.stringify(man));
          this.alertService.error(JSON.stringify(man));
        }
      });
    }
    this.dialogRef.close();
  }
}
