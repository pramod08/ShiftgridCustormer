import {Component, OnInit} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import {Authenticator} from '../auth/Authenticator';
import {AuthenticatedHttpService} from '../auth/AuthenticatedHttpService';
import { Router, Routes, RouterModule} from '@angular/router';
import "rxjs/add/operator/delay";
import "rxjs/add/operator/retry";
import "rxjs/add/operator/retryWhen";
import {Observable}     from 'rxjs/Observable';
import {CompanyService} from '../auth/company-service';


@Component({
    providers: [CompanyService],
    selector: 'reminder',
    templateUrl: 'app/reminder/reminder.template.html',
})
//sendmail
export class Reminder implements OnInit {
    public domainemail = [];
    router: Router;
    mail: string;
    userPrincipalName: string;
    data: boolean = false;
    invalidCompany: boolean = false;

    constructor(private _http: AuthenticatedHttpService, router: Router, public companyservice: CompanyService) {
        this.router = router;
        this.invalidCompany;

    }

    sendmail(name: string) {
        var email: string;
        var company: string;
        console.log("inside  sendMail");
        for (var datas in this.domainemail) {
            console.log(this.domainemail[datas]);
            if (name === this.domainemail[datas].domain) {
                email = this.domainemail[datas].id;
                company = this.domainemail[datas].domain;
                console.log(this.domainemail[datas].domain);
                this.data = true;
            } else {
                this.invalidCompany = true;
            }
            if (this.data) {
                this.router.navigate(['']);
            }
        }
        this.companyservice.updateFindCompanyObservable.next({
            mail: email,
            userPrincipalName: company
        });
        console.log(email + " " + company);
    }

    ngOnInit() {
        this.companyservice.get("https://graph.windows.net/dev-tenant.siftgrid.com/users?api-version=beta")
            .subscribe(data => {
                console.log(data);
                for (var key in data["value"]) {
                    //  console.log(data["value"][key]["name"])
                    //this.domainemail.push(data["value"][key]["mail"]);
                    //this.domainemail.push(data["value"][key]["userPrincipalName"]);
                    this.domainemail.push({ id: data["value"][key]["mail"], domain: data["value"][key]["otherMails"][0] });
                }
            });

    }

}
