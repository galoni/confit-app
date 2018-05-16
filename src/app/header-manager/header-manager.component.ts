import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../services/user-auth.service';

@Component({
  selector: 'app-header-manager',
  templateUrl: './header-manager.component.html',
  styleUrls: ['./header-manager.component.css']
})
export class HeaderManagerComponent implements OnInit {

  constructor(private userauthService: UserAuthService) { }

  isAuth() {
    return this.userauthService.isAuthenticated();
  }
  ngOnInit() {
  }
  onLogout() {
    alert("LogOut Called");
    this.userauthService.logout();
  }

}
