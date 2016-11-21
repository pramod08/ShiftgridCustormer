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
var Authenticator_1 = require('../auth/Authenticator');
var AuthenticatedHttpService_1 = require('../auth/AuthenticatedHttpService');
var router_1 = require('@angular/router');
require("rxjs/add/operator/delay");
require("rxjs/add/operator/retry");
require("rxjs/add/operator/retryWhen");
require('rxjs/Rx');
var company_service_1 = require('../auth/company-service');
var SignInComponent = (function () {
    function SignInComponent(_authenticator, _http, router, companyservice, http) {
        this._authenticator = _authenticator;
        this._http = _http;
        this.router = router;
        this.companyservice = companyservice;
        this.http = http;
        this.domainname = [];
        this.data = false;
    }
    SignInComponent.prototype.checkLogin = function (email, password) {
        var user;
        var company;
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
            }
            if (this.data) {
                // window.location.href = 'http://devtenant.canadacentral.cloudapp.azure.com/';
                //    console.log(this.domainname)
                //     console.log(datas)
                //    console.log(this.domainname[datas])
                var usernameFromEmail = email.split("@");
                var username = usernameFromEmail[0];
                var domainName = usernameFromEmail[1];
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
                var usernameFromEmail = email1.split("@");
                var username = usernameFromEmail[0];
                var domainName = usernameFromEmail[1];
                var tenantname = domainName.split(".")[0];
                this._authenticator.username = username;
                this._authenticator.TenantName = tenantname;
            }
        }
        console.log(email);
    };
    SignInComponent.prototype.ngOnInit = function () {
        var _this = this;
        var url = "/Token/getToken/";
        this.http.get(url).
            subscribe(function (response) {
            console.log(response);
            console.log(response.text());
            //   console.log(response.json);
            localStorage.setItem('auth_token', response.text());
            // localStorage.setItem('jwt', response);
            _this.companyservice.get("https://graph.windows.net/dev-tenant.siftgrid.com/users?api-version=beta")
                .subscribe(function (data) {
                console.log(data);
                _this.dataFromResponse = data;
                for (var key in data["value"]) {
                    //  console.log(data["value"][key]["name"])
                    _this.domainname.push(data["value"][key]["userPrincipalName"]);
                    _this.domainname.push(data["value"][key]["otherMails"][0]);
                }
            });
        }, function (error) { console.log(error); }, function () { console.log("completed."); });
    };
    SignInComponent = __decorate([
        core_1.Component({
            providers: [company_service_1.CompanyService],
            selector: 'login',
            templateUrl: 'app/signin/signin.template.html',
        }), 
        __metadata('design:paramtypes', [Authenticator_1.Authenticator, AuthenticatedHttpService_1.AuthenticatedHttpService, router_1.Router, company_service_1.CompanyService, http_1.Http])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=signin.component.js.map