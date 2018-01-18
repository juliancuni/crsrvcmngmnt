import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {NotificationService} from "../../utils/notification.service";
import { UserApi } from '../../../shared/sdk/services/custom/User';
declare var $:any;

@Component({
  selector: 'sa-logout',
  template: `
    <div id="logout" (click)="showPopup()" class="btn-header transparent pull-right">
      <span>
        <a routerlink="/auth/login" title="Sign Out" data-action="userLogout">
          <i class="fa fa-sign-out"></i>
        </a>
      </span>
    </div>
  `,
  styles: []
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router,
              private notificationService: NotificationService, private _perdorues: UserApi) { }

  showPopup(){
    this.notificationService.smartMessageBox({
      title : "<i class='fa fa-sign-out txt-color-orangeDark'></i> Logout <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
      content : "Jeni i sigurtë që doni të dilni?",
      buttons : '[Jo][Po]'

    }, (ButtonPressed) => {
      if (ButtonPressed == "Po") {
        this.logout()
      }
    });
  }

  logout(){
    this._perdorues.logout().subscribe(() => {
      this.router.navigate(['/auth/login'])
    });
  }

  ngOnInit() {

  }



}
