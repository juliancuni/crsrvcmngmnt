import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { User } from '../../shared/sdk/services/custom/Perdorues';
import { UserApi } from 'app/shared/sdk';


@Injectable()
export class UnauthGuard implements CanActivate {
  constructor(private auth: UserApi, private router: Router) {}

  canActivate() {
    if(!this.auth.isAuthenticated()){
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
