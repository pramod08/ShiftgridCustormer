import { Injectable, Inject } from '@angular/core';
import {Authenticator} from './Authenticator';
import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs';
import {Http, Headers, Response, RequestOptions} from '@angular/http';
import 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AuthenticatedHttpService {
  private _authenticator:Authenticator;
  private _http:Http;
  constructor( @Inject(Http) http: Http, @Inject(Authenticator) authenticator: Authenticator) { 
    this._authenticator = authenticator;
    this._http = http;
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'Bearer ' + this._authenticator.getAccessToken());
    headers.append('Content-Type', 'application/json');
   //console.log("--Header---"+headers)
  }
createAuthorizationHeaderGoDady(headers: Headers) {
    console.log("--Authorization  godady account---");
    headers.append('Authorization', 'sso-key '+'' + 'dKYSZpfcEdo2_XBy6SmUB95CDe1gknX1Mey' + ':' + '8J6mr87eMP1wd5K9SnvYMk');
    headers.append('Content-Type', 'application/json');
   //console.log("--Header---"+headers)
  }
createAuthorizationHeaderSendWithUS(headers:Headers) {
    headers.append('Authorization', 'Basic ' + btoa('live_e25beff59128a8eb6fcca5e59fe4780705e0c093:'));
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    headers.append('Access-Control-Allow-Credentials', 'true');
   
    }  

sendmail(url, data) {
    console.log("send mail  postData");
    let headers = new Headers({
        'X-Requested-With': 'XMLHttpRequest'
    });
    this.createAuthorizationHeaderSendWithUS(headers);
    return this._http.post(url, data, {
        headers: headers,
    });
}



get(url): Observable<any[]> {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this._http.get(url, { headers: headers })
        .map((res: Response) => res.json())
        .publishReplay(-1)
        .refCount()
        //...errors if any
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
}
  }
