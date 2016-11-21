
import { Injectable } from "@angular/core";

import { Http, Headers, RequestOptions, Response } from "@angular/http";

 import { Observable }       from "rxjs/Observable";

import "rxjs/add/operator/map"
import "rxjs/add/operator/buffer"
import {BehaviorSubject} from "rxjs/Rx";
import {Subject} from "rxjs/Rx";

import {ReplaySubject} from "rxjs/Rx"


@Injectable()
export class AspectRatioService {


    constructor(private http: Http) {

    }

    GetCSSJSONData() {
       return  this.http.get("app/css.json").map(res => res.json()).cache();
           
    }

    WidthRatio(referenceWidth: number, deviceWidth: number): number {
        return deviceWidth / referenceWidth;
    }

    ComponentWidth(ratioWidth: number, referenceWidth: number): number {
        return referenceWidth * ratioWidth;
    }

    ComponentLeft(componentWidthRatio: number, componentJsonRefLeft: number): number {
        return componentWidthRatio * componentJsonRefLeft;
    }

    ComponentHeight(currentComponentWidth: number, componentJsonRefHeightRatio: number): number {
        return currentComponentWidth * componentJsonRefHeightRatio;
    }

    ComponentTop(componentLeft: number, componentJsonRefTopRatio: number): number {
        return componentLeft * componentJsonRefTopRatio;
    }


}

