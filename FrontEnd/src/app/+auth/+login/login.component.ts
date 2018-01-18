import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { FormGroup, FormBuilder, Validators }   from '@angular/forms';
import { UserApi } from '../../shared/sdk/services/custom/User';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  valForm: FormGroup;
  loginerror: any;
  constructor(private _router: Router, public _fb: FormBuilder, public _perdorues: UserApi) {
    this.valForm = _fb.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required],
  });
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    for (let c in this.valForm.controls) {
        this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
        // this.submited = true;
        // this.loading = true;
        // if(this.valForm.value.rememberMe == null) {
        //     this.valForm.value.rememberMe = false;
        // }
        this._perdorues.login(this.valForm.value).subscribe(login => {
            this.postLogIn(login);
        }, err => {
            this.postLogIn(err);
            // this.loading = false;
            // this.submited = false;
        });
    } else {
      this.loginerror = "Kujdes! Përdoruesi/Fjalëkalimi bosh";
    }
  }
  private postLogIn(respLogin): void {
    if(respLogin.name == "Error"){
        // this.triggerError = true;
        this.loginerror = "Kujdes! " + respLogin.message;                
    } else {
        // let tokenAttrib = {
        //     "browser": gjejBrowser().name + " V:" + gjejBrowser().version,
        //     "geoLocation": { 
        //         "ipAddr": this.ipAddress._body
        //         // "shteti": JSON.parse(this.ipAddress._body).countryCode,
        //         // "isp": JSON.parse(this.ipAddress._body).isp
        //     }
        // }
        this._router.navigate(['/home']);
        // this._token.updateAttributes(respLogin.id, tokenAttrib).subscribe((token) => {
        //     this._perdorues.findById(this._auth.getCurrentUserData().id, {"include": { "relation": "accessTokens"}}).subscribe((res) => {
        //         if(res["accessTokens"].length > 1) {
        //             this._rt.IO.emit("sessioneTeHapura" + this._auth.getCurrentUserData().id, res["accessTokens"]);
        //         }
        //     })
        // }, err => {});
        // this.loading = false;
        // this.submited = false;
    }
}
  ngOnInit() {
  }

  // login(event){
  //   event.preventDefault();
  //   this._router.navigate(['/dashboard/+analytics'])
  // }

}
