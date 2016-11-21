import { Injectable } from '@angular/core';
import {AuthHelperBase} from './AuthHelperBase';
import {ServiceConstants} from './ServiceConstants';

@Injectable()
export class Authenticator {
    constructor(private _authHelperBase:AuthHelperBase) { }    
    public isUserAuthenticated():boolean {return this._authHelperBase.isUserAuthenticated();}
    public logIn(state = "/") {return this._authHelperBase.logIn(state);}
    public logOut(state = "/") {return this._authHelperBase.logOut(state);}
    public getAccessToken() {return this._authHelperBase.getAccessToken();}
    public get userName() {return this._authHelperBase.userName;}
    public serviceConstants(): ServiceConstants { return this._authHelperBase.ServiceConstants(); }


    private  _username: string = null;
    private _tenantName: string = null;
    public get username(): string {
        return  this._username;
    }

    public set TenantName(value: string) {
        this._tenantName = value;
    }

    public get TenantName(): string {
        return this._tenantName;
    }

    public set username(value: string) {
        this._username = value;
    }
}