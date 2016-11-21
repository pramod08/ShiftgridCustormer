import {Component, OnInit} from '@angular/core';
import { Http, Headers } from '@angular/http';
import {Authenticator} from '../auth/Authenticator';
import {AuthenticatedHttpService} from '../auth/AuthenticatedHttpService';
import { Router, Routes, RouterModule } from '@angular/router';
import "rxjs/add/operator/delay";
import "rxjs/add/operator/retry";
import "rxjs/add/operator/retryWhen";
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx'
import { CompanyService} from '../auth/company-service';

@Component({
    providers: [CompanyService],
    selector: 'login',
    templateUrl: 'app/signin/signin.template.html',
})
export class SignInComponent implements OnInit {
    private domainname = [];
    data: boolean = false;
    dataFromResponse;
    constructor(private _authenticator: Authenticator,
        private _http: AuthenticatedHttpService,
        private router: Router, public companyservice: CompanyService, private http: Http) { }

    checkLogin(email: string, password: string): void {
        var user: string;
        var company: string;
        var domain = [];
        for (var datas in this.domainname) {
            //console.log(this.domainname[datas]);
            if (email === this.domainname[datas] && password === 'bizruntime@123') {
                //var s: string = email;
                //domain = s.split('@');

                //for(var word in domain)
                //{
                //    console.log(word[0]);
                //    console.log(word);
                //}
                user = email;
                this.data = true;
            } if (this.data) {
                // window.location.href = 'http://devtenant.canadacentral.cloudapp.azure.com/';
            //    console.log(this.domainname)
           //     console.log(datas)
            //    console.log(this.domainname[datas])

                var usernameFromEmail = email.split("@");
                var username = usernameFromEmail[0]
                var domainName = usernameFromEmail[1]
                var tenantname = domainName.split(".")[0];
                this._authenticator.username = username;
                this._authenticator.TenantName = tenantname;

                this.router.navigate(['./UIBackground']);
            }
            else {
                this.router.navigate(['./login']);
            }
        }

        for (var key in this.dataFromResponse["value"]) {
            //  console.log(data["value"][key]["name"])
            if (this.dataFromResponse["value"][key]["otherMails"][0] == email) {
                var email1 = this.dataFromResponse["value"][key]["userPrincipalName"];

                var usernameFromEmail: string[] = email1.split("@");
                var username = usernameFromEmail[0]
                var domainName = usernameFromEmail[1]
                var tenantname = domainName.split(".")[0];
                this._authenticator.username = username;
                this._authenticator.TenantName = tenantname;
            }
            
            // console.log(this.domainname);
        }
        console.log(email);
    }


    ngOnInit() {


        let url = "/Token/getToken/";
        this.http.get(url).
            subscribe((response) => {
                console.log(response);
                console.log(response.text());
                //   console.log(response.json);
                localStorage.setItem('auth_token', response.text());
                // localStorage.setItem('jwt', response);
                this.companyservice.get("https://graph.windows.net/dev-tenant.siftgrid.com/users?api-version=beta")
                    .subscribe(data => {
                        console.log(data);
                        this.dataFromResponse = data;
                        for (var key in data["value"]) {
                            //  console.log(data["value"][key]["name"])
                            this.domainname.push(data["value"][key]["userPrincipalName"]);
                            this.domainname.push(data["value"][key]["otherMails"][0]);
                            // console.log(this.domainname);
                        }
                    });
            },
            (error) => { console.log(error); },
            () => { console.log("completed."); });

       

    }
}