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
var searchService_1 = require("./searchService");
var Observable_1 = require("rxjs/Observable");
var SearchComponent = (function () {
    function SearchComponent(searchservice) {
        this.searchservice = searchservice;
        this.filteredList = [];
        this.query = '';
        this.myEvent = new core_1.EventEmitter();
    }
    SearchComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        var input = document.getElementById('search');
        //console.log(input);
        var search$ = Observable_1.Observable.fromEvent(input, 'keyup')
            .do(function () {
            console.log(input.value);
            if (input.value.length === 0)
                _this.filteredList = [];
        })
            .filter(function (val) { return input.value.length > 0; })
            .switchMap(function () {
            return _this.searchservice.search(input.value);
        });
        search$.subscribe(function (res) {
            //console.log(res);
            _this.filteredList = res;
            //console.log(this.filteredList);
        });
        console.log("ok");
    };
    SearchComponent.prototype.select = function (item) {
        var _this = this;
        console.log(item);
        this.query = item;
        this.searchservice.Getid_Name(item)
            .subscribe(function (res) {
            console.log(res);
            var guid = res[0]["Guid"];
            //          this.myEvent.emit(guid);
            _this.searchservice.createDiagram$.next(res);
        }, function (err) { return console.log(err); }, function () { return console.log("done"); });
        this.filteredList = [];
        this.selectedIdx = -1;
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SearchComponent.prototype, "myEvent", void 0);
    SearchComponent = __decorate([
        core_1.Component({
            selector: 'search',
            templateUrl: 'app/search/search.template.html',
            styleUrls: ['app/search/search.template.css'],
        }), 
        __metadata('design:paramtypes', [searchService_1.SearchService])
    ], SearchComponent);
    return SearchComponent;
}());
exports.SearchComponent = SearchComponent;
//# sourceMappingURL=search.component.js.map