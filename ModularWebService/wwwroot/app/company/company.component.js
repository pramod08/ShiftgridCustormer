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
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
require("rxjs/add/operator/delay");
require("rxjs/add/operator/retry");
require("rxjs/add/operator/retryWhen");
require('rxjs/Rx');
var company_service_1 = require('../auth/company-service');
var CompanyComponent = (function () {
    function CompanyComponent(router, companyservice, http) {
        this.companyservice = companyservice;
        this.http = http;
        this.domainname = [];
        this.invalidCompany = false;
        this.showSigninPage = true;
        this.router = router;
        this.invalidCompany;
        this.browserUrl = window.location.hostname.split('.')[0];
    }
    CompanyComponent.prototype.checkCompanyName = function (comapnyName) {
        var company;
        var data = false;
        var domain = comapnyName + ".siftgrid.com";
        for (var datas in this.domainname) {
            if (domain === this.domainname[datas]) {
                data = true;
                company = comapnyName;
            }
            else {
                this.invalidCompany = true;
            }
            if (data) {
                this.router.navigate(['./login']);
                this.showSigninPage = false;
            }
        }
    };
    CompanyComponent.prototype.findcompany = function () {
        this.router.navigate(['./findcompany']);
    };
    CompanyComponent.prototype.ngOnInit = function () {
        var _this = this;
        var url = "/Token/getToken/";
        this.http.get(url).
            subscribe(function (response) {
            console.log(response);
            console.log(response.text());
            //   console.log(response.json);
            localStorage.setItem('auth_token', response.text());
            // localStorage.setItem('jwt', response);
            _this.companyservice.get("https://graph.windows.net/dev-tenant.siftgrid.com/domains?api-version=beta")
                .subscribe(function (data) {
                console.log(data);
                for (var key in data["value"]) {
                    //  console.log(data["value"][key]["name"])
                    _this.domainname.push(data["value"][key]["name"]);
                }
            });
        }, function (error) { console.log(error); }, function () { console.log("completed."); });
    };
    CompanyComponent = __decorate([
        core_1.Component({
            providers: [company_service_1.CompanyService],
            selector: "company",
            templateUrl: "app/company/company.component.html",
        }), 
        __metadata('design:paramtypes', [router_1.Router, company_service_1.CompanyService, http_1.Http])
    ], CompanyComponent);
    return CompanyComponent;
}());
exports.CompanyComponent = CompanyComponent;
//# sourceMappingURL=company.component.js.map