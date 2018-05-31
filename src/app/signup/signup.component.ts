import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from "@angular/forms";
import { UserAuthService } from '../services/user-auth.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {EditConfSessionComponent} from '../edit-conf-session/edit-conf-session.component';
import {ManagerService} from '../services/manager.service';
import {VisitorService} from '../services/visitor.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;
  error = false;
  errorMessage = '';
  managerData: any= {};

 constructor(private fb: FormBuilder, private userauthService: UserAuthService,
             private managerService: ManagerService,
             private visitorService: VisitorService,
             public dialogRef: MatDialogRef<EditConfSessionComponent>,
             @Inject(MAT_DIALOG_DATA) public data: any) {}
  ngOnInit() {
   if (this.data) {
    console.log('data: ' + this.data);
   }
  this.myForm = this.fb.group({
            email: ['', Validators.compose([
                Validators.required,
                this.isEmail
            ])],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.compose([
                Validators.required,
                this.isEqualPassword.bind(this)
            ])],
            firstName: ['', Validators.compose([
              Validators.required,
            ])],
            lastName: ['', Validators.compose([
              Validators.required,
            ])],
            linkedin: ['', Validators.compose([
              Validators.required,
            ])],
            education: ['', Validators.compose([
              Validators.required,
            ])],
            occupation: ['', Validators.compose([
              Validators.required,
            ])],
        });
  }
  isEmail(control: FormControl): {[s: string]: boolean} {
      if (!control.value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
          return {noEmail: true};
      }
  }
  isEqualPassword(control: FormControl): {[s: string]: boolean} {
      if (!this.myForm) {
          return {passwordsNotMatch: true};
      }
      if (control.value !== this.myForm.controls['password'].value) {
          return {passwordsNotMatch: true};
      }
  }
 onSignup() {
      // this.userauthService.signupUser(this.myForm.value);
   this.managerData.firstName = this.myForm.value.firstName;
   this.managerData.lastName = this.myForm.value.lastName;
   this.managerData.email = this.myForm.value.email;
   this.managerData.password = this.myForm.value.password;
   this.managerData.linkedin = this.myForm.value.linkedin;
   this.managerData.education = this.myForm.value.education;
   this.managerData.occupation = this.myForm.value.occupation;
   // console.log('manager: ' + JSON.stringify(this.managerData));
   if (this.data) {
     this.managerService.createManager(this.managerData).then((man) => {
       console.log('manager: ' + JSON.stringify(man));
       this.dialogRef.close();
     });
    }
    else {
     this.visitorService.createVisitor(this.managerData).then((man) => {
       console.log('visitor: ' + JSON.stringify(man));
       this.dialogRef.close();
     });
   }
   }
}
