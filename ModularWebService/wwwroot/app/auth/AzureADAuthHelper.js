"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var AuthHelperBase_1 = require('./AuthHelperBase');
var ServiceConstants_1 = require("./ServiceConstants");
var AzureADAuthHelper = (function (_super) {
    __extends(AzureADAuthHelper, _super);
    function AzureADAuthHelper(_serviceConstants) {
        _super.call(this);
        this._serviceConstants = _serviceConstants;
        this.parseQueryString = function (url) {
            var params = {};
            var queryString = "";
            if (url.search("#") != -1) {
                queryString = url.substring(url.search("#") + 1);
            }
            else {
                queryString = url.substring(url.indexOf("?") + 1);
            }
            var a = queryString.split('&');
            for (var i = 0; i < a.length; i++) {
                var b = a[i].split('=');
                params[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
            }
            return params;
        };
        this.params = this.parseQueryString(location.hash);
        // do we have an access token, if so add the iframe renewer
        if (window.localStorage.getItem("access_token")) {
            var iframe = document.createElement('iframe');
            iframe.style.display = "none";
            iframe.src = "/IF/BIF/Framework/Authentication/renewToken.html?tenantID=" +
                encodeURIComponent(this._serviceConstants.tenantID) +
                "&clientID=" + encodeURIComponent(this._serviceConstants.clientID) +
                "&resource=" + encodeURIComponent(this._serviceConstants.graphResource);
            window.onload = function () {
                document.body.appendChild(iframe);
            };
        }
        if (this.params["id_token"] != null) {
            window.localStorage.setItem("id_token", this.params["id_token"]);
            // redirect to get access token here..
            //for   single   tenant   Apps use  
            //use 
            window.location.href = "https://login.microsoftonline.com/" + this._serviceConstants.tenantID +
                "/oauth2/authorize?response_type=token&client_id=" + this._serviceConstants.clientID +
                "&resource=" + this._serviceConstants.graphResource +
                "&redirect_uri=" + encodeURIComponent(window.location.href) +
                "&prompt=none&state=" + this.params["state"] + "&nonce=SomeNonce";
        }
        else if (this.params["access_token"] != null) {
            window.localStorage.setItem("access_token", this.params["access_token"]);
            // redirect to the original call URl here.
            window.location.href = this.params["state"];
        }
    }
    AzureADAuthHelper.prototype.logIn = function (state) {
        if (state === void 0) { state = "/"; }
        window.location.href = "https://login.microsoftonline.com/" + this._serviceConstants.tenantID +
            "/oauth2/authorize?response_type=id_token&client_id=" + this._serviceConstants.clientID +
            "&redirect_uri=" + encodeURIComponent(window.location.href) +
            "&state=" + state + "&nonce=SomeNonce";
    };
    AzureADAuthHelper.prototype.logOut = function (state) {
        if (state === void 0) { state = "/"; }
        window.localStorage.removeItem("id_token");
        window.localStorage.removeItem("access_token");
        window.location.href = state;
    };
    AzureADAuthHelper.prototype.refreshAccessToken = function (state) {
        if (state === void 0) { state = "/"; }
        this.logIn(state); // force login, assume that renewToken.html didn't work which is why dev is calling this.
    };
    AzureADAuthHelper.prototype.getAccessToken = function () {
        return window.localStorage.getItem("access_token");
    };
    AzureADAuthHelper.prototype.ServiceConstants = function () {
        return this._serviceConstants;
    };
    AzureADAuthHelper = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [ServiceConstants_1.ServiceConstants])
    ], AzureADAuthHelper);
    return AzureADAuthHelper;
}(AuthHelperBase_1.AuthHelperBase));
exports.AzureADAuthHelper = AzureADAuthHelper;
function error(err) {
    console.error(JSON.stringify(err, null, 4));
}
//# sourceMappingURL=AzureADAuthHelper.js.map