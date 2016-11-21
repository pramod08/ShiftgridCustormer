"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
/// <reference path="../reminder/reminder.component.ts" />
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
require("rxjs/add/operator/delay");
require("rxjs/add/operator/retry");
require("rxjs/add/operator/retryWhen");
var company_service_1 = require('../auth/company-service');
var FindCompanyComponent = (function () {
    function FindCompanyComponent(router, companyservice) {
        this.companyservice = companyservice;
        this.domainemail = [];
        this.data = false;
        this.invalidCompany = false;
        this.router = router;
        this.invalidCompany;
    }
    FindCompanyComponent.prototype.sendmail = function (name) {
        var email;
        var company;
        console.log("inside  sendMail");
        for (var datas in this.domainemail) {
            console.log(this.domainemail[datas]);
            if (name === this.domainemail[datas].domain) {
                email = this.domainemail[datas].id;
                company = this.domainemail[datas].domain;
                console.log(this.domainemail[datas].domain);
                this.data = true;
            }
            else {
                this.invalidCompany = true;
            }
            if (this.data) {
                this.router.navigate(['./reminder']);
            }
        }
        this.companyservice.updateFindCompanyObservable.next({
            mail: email,
            userPrincipalName: company
        });
        console.log(email + " " + company);
    };
    FindCompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.companyservice.get("https://graph.windows.net/dev-tenant.siftgrid.com/users?api-version=beta")
            .subscribe(function (data) {
            console.log(data);
            for (var key in data["value"]) {
                //  console.log(data["value"][key]["name"])
                //this.domainemail.push(data["value"][key]["mail"]);
                console.log(data["value"][key]["otherMails"][0]);
                _this.domainemail.push({ id: data["value"][key]["mail"], domain: data["value"][key]["otherMails"][0] });
            }
        });
    };
    FindCompanyComponent = __decorate([
        core_1.Component({
            providers: [company_service_1.CompanyService],
            selector: 'findcompany',
            templateUrl: 'app/findcompany/find-company.template.html',
        }), 
        __metadata('design:paramtypes', [router_1.Router, company_service_1.CompanyService])
    ], FindCompanyComponent);
    return FindCompanyComponent;
}());
exports.FindCompanyComponent = FindCompanyComponent;
//# sourceMappingURL=find-company.component.js.map