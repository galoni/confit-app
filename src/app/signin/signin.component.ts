import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserAuthService } from '../services/user-auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

myForm: FormGroup;
    error = false;
    errorMessage = '';

    constructor(private fb: FormBuilder, private userauthService: UserAuthService) {}

    onSignin() {
      this.userauthService.signinUser(this.myForm.value);
    }
ngOnInit():any {
        this.myForm = this.fb.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
}
