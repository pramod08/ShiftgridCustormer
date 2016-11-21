import { Component, AfterViewInit ,Output,EventEmitter} from '@angular/core';
import { SearchService} from "./searchService";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'search',
    templateUrl: 'app/search/search.template.html',
    styleUrls: ['app/search/search.template.css'],
})
export class SearchComponent implements AfterViewInit {


    constructor(private searchservice: SearchService) {
    }

    public filteredList=[];
    public query = '';
    selectedIdx: number;
    @Output() myEvent = new EventEmitter();

    ngAfterViewInit() {

        const input: HTMLInputElement = <HTMLInputElement>document.getElementById('search')
        //console.log(input);
        const search$ = Observable.fromEvent(input, 'keyup')
            .do(() => {
                console.log(input.value);
                if (input.value.length === 0)
                    this.filteredList = []
            })
            .filter((val: HTMLInputElement) => input.value.length > 0)
            .switchMap(() =>
                this.searchservice.search(input.value)
        );
        search$.subscribe((res:any )=> {
            //console.log(res);
            this.filteredList = res;
            //console.log(this.filteredList);
        });
        console.log("ok");

    }

    select(item) {
        console.log(item);
        this.query = item;
        this.searchservice.Getid_Name(item)
            .subscribe(res => {
                console.log(res);
                var guid = res[0]["Guid"];
                //          this.myEvent.emit(guid);
                this.searchservice.createDiagram$.next(res)
            },
            err => console.log(err),
            () => console.log("done"))
       this.filteredList = [];
        this.selectedIdx = -1;
    }


}