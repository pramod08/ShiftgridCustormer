import {Component, HostListener} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SearchService} from "../search/searchService";
import {AspectRatioService} from '../aspectratiocalculation/AspectRatioService'
import {AreaService} from '../area/areaService'
import {Authenticator} from '../auth/Authenticator';

declare var $: any;
@Component({
    selector: 'headersearchbox',
    templateUrl: 'app/headersearchbox/headersearchbox.template.html'
})
export class HeaderSeachboxComponent {

    json: Object;

    constructor(public http: Http, private searchservice: SearchService
        , public aspectRatio: AspectRatioService, public areaService: AreaService,
        private _authenticator: Authenticator) {

        searchservice.tenantName = _authenticator.TenantName
        areaService.GetTenantId(_authenticator.TenantName).do(res => console.log(res))
            .subscribe(res => searchservice.tenantId = res)
    }

    /**
     * this function is used to get device width
     */
    ngOnInit() {

        this.getCSSJSONData();
         //this.createDynamicCSS();

    }

    @HostListener('window:resize')
    onResize() {
        this.getCSSJSONData();
    }

    getCSSJSONData() {
        this.http.get("app/css.json")
            //.map(this.extractData)
            .subscribe(json => {
                this.json = json.json();
                this.createDynamicCSS();
            });
    }

    private handleError(error: Response) {

    }

    createDynamicCSS() {

        let deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        let UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        let currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["HeaderSeachbox"])["width"]);
        let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["HeaderSeachbox"])["height"] / (this.json["HeaderSeachbox"])["width"]);
        let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["HeaderSeachbox"])["left"]);
        let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["HeaderSeachbox"])["top"] / (this.json["HeaderSeachbox"])["left"]);
        
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#HeaderSeachbox": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "margin-right": 0,
                "padding": 0,
                "background-color": "#333333",
                "color": "white",
                "position": "absolute"
            }
        }); // end of dynamic css

        let suggestionComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["SuggestionSeachbox"])["width"]);
        let suggesstionComponentHeight = this.aspectRatio.ComponentHeight(suggestionComponentWidth, (this.json["SuggestionSeachbox"])["height"] / (this.json["SuggestionSeachbox"])["width"]);
        let suggestionComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["SuggestionSeachbox"])["left"]);
        let suggestionComponentTop = this.aspectRatio.ComponentTop(suggestionComponentLeft, (this.json["SuggestionSeachbox"])["top"] / (this.json["SuggestionSeachbox"])["left"]);

        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            ".SuggestionSeachbox": {
                "height": 0,
                "width": suggestionComponentWidth,
                "margin-left": suggestionComponentLeft,
                "margin-top": suggestionComponentTop,
                "margin-right": 0,
                "padding": 0,
                "background-color": "#333333",
                "color": "white",
                "position": "absolute"
            }
        }); // end of dynamic css



    }




    public filteredList = [];
    public query = '';
    selectedIdx: number;

    ngAfterViewInit() {

        const input: HTMLInputElement = <HTMLInputElement>document.getElementById('HeaderSeachbox')
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
        search$.subscribe(res => {
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
                if (res[0]['Type'] === "Areas")
                    this.searchservice.createDiagram$.next(res)
                if (res[0]['Type'] === "Location Group") {

                    var data = res
                    this.searchservice.createDiagram$.next(res);

                    Observable.of(10).delay(2000).subscribe(res => {
                        this.searchservice.createDiagramWithLocation$.next(data);

                    });



                }
                if (res[0]['Type'] === "People") {
                    this.searchservice.createpeopleDiagramWithLocation$.next(res);
                }
            },
            err => console.log(err),
            () => console.log("done"))
        this.filteredList = [];
        this.selectedIdx = -1;
    }

}