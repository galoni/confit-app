import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import {EditConfSessionComponent} from '../edit-conf-session/edit-conf-session.component';
import {SigninComponent} from '../signin/signin.component';
import {SignupComponent} from '../signup/signup.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }
  checked: number = 0;

  ngOnInit() {
  }
  onChange(value) {
    if (value.checked === true) {
      this.checked = 1;
      console.log(this.checked);
    } else {
      this.checked = 0;
      console.log(this.checked);
    }
  }
  openDialogSignIn(): void {
    // console.log('dig conf: ' + JSON.stringify(this.conf));
    let dialogRef = this.dialog.open(SigninComponent, {
      width: '430px',
      data: this.checked
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:' + JSON.stringify(result));
    });
  }
  openDialogSignUp(): void {
    // console.log('dig conf: ' + JSON.stringify(this.conf));
    let dialogRef = this.dialog.open(SignupComponent, {
      width: '430px',
      data: this.checked
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:' + JSON.stringify(result));
      // this.confSession = result;
    });
  }
}
