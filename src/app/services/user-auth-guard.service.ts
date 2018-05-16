import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { UserAuthService } from './user-auth.service';
import { Router } from "@angular/router";

@Injectable()
export class UserAuthGuardService {

  constructor(private _data: UserAuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this._data.isAuthenticated()) {
      return true;
    }
    else {
      this.router.navigate(['/signin']);
    }
  }
}
