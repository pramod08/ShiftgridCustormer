import {Component, OnInit} from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, Routes, RouterModule } from '@angular/router';


@Component({
    selector: 'app',
    template: '<router-outlet></router-outlet>'

})

export class AppComponent implements OnInit {
    constructor(public router:Router,public http: Http) { }

    ngOnInit() {
        console.log("adDomain");

        let url = "/Token/getToken/";
        this.http.get(url).
            subscribe((response) => {
                console.log(response);
                console.log(response.text());
                //   console.log(response.json);
                localStorage.setItem('auth_token', response.text());
                // localStorage.setItem('jwt', response);
            },
            (error) => { console.log(error); },
            () => { console.log("completed."); });

        this.router.navigate(['./company']);

    }


}