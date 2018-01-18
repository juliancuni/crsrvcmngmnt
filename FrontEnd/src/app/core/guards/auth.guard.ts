import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { PerdoruesApi } from '../../shared/sdk/services/custom/Perdorues';
import { UserApi } from 'app/shared/sdk';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _auth: UserApi, private _router: Router) {}

  canActivate() {
    if(this._auth.isAuthenticated()){
      return true;
    } else {
      this._router.navigate(['/auth/login']);
      return false;
    }
  }
}
