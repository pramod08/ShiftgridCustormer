import {Component, OnInit} from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, Routes } from '@angular/router';
import "rxjs/add/operator/delay";
import "rxjs/add/operator/retry";
import "rxjs/add/operator/retryWhen";
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import {CompanyService} from '../auth/company-service';


@Component({
    providers: [CompanyService],
    selector: "company",
    templateUrl: "app/company/company.component.html",
})

export class CompanyComponent implements OnInit {
    router: Router;
    public domainname = [];
    mail: string;
    userPrincipalName: string;
    invalidCompany: boolean = false;
    showSigninPage: boolean = true;
    browserUrl
    constructor(router: Router, public companyservice: CompanyService, private http: Http) {
        this.router = router;
        this.invalidCompany;
        this.browserUrl = window.location.hostname.split('.')[0]
    }

    checkCompanyName(comapnyName: string) {
        var company: string;
        var data: boolean = false;
        var domain: string = comapnyName + ".siftgrid.com";
        for (var datas in this.domainname) {
            if (domain === this.domainname[datas]) {
                data = true;
                company = comapnyName;
                //this.invalidCompany = true;
            //    window.location.href = 'http://' + company + '.siftgrid.com:8080/login';

            }
            else {
                this.invalidCompany = true;
                // this.router.navigate(['./findcompany']);
            }

            if (data) {
                this.router.navigate(['./login']);
                this.showSigninPage= false;

            }
                      
        }
       
    }

    findcompany() {
        this.router.navigate(['./findcompany']);
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

                this.companyservice.get("https://graph.windows.net/dev-tenant.siftgrid.com/domains?api-version=beta")
                    .subscribe(data => {
                        console.log(data);
                        for (var key in data["value"]) {
                            //  console.log(data["value"][key]["name"])
                            this.domainname.push(data["value"][key]["name"]);
                            // console.log(this.domainname);
                        }
                    });
            },
            (error) => { console.log(error); },
            () => { console.log("completed."); });
   


    }
}