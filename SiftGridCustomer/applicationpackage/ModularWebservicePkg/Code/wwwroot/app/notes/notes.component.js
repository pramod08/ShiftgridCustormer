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
var notesService_1 = require('../notes/notesService');
var guid_1 = require("../area/guid");
var http_1 = require('@angular/http');
var diagramService_1 = require('../diagram/diagramService');
var Authenticator_1 = require('../auth/Authenticator');
var NotesComponent = (function () {
    function NotesComponent(inspector, http, diagramService, _authenticator) {
        var _this = this;
        this.inspector = inspector;
        this.http = http;
        this.diagramService = diagramService;
        this._authenticator = _authenticator;
        this.i = 0;
        this.dateAndTime = new Date();
        this.noteEdit = false;
        this._mouseEnterStream = new core_1.EventEmitter();
        this._mouseLeaveStream = new core_1.EventEmitter();
        this.inspector = inspector;
        this.inspector.showNotesObservable.subscribe(function (response) {
            console.log("showNotesObservable :" + response);
            _this.notesData = response;
            console.log(_this.notesData);
        });
    }
    NotesComponent.prototype.createTextArea = function () {
        //document.getElementById("noteid").style.visibility = "visible";
        document.getElementById("noteid").style.display = "block";
    };
    NotesComponent.prototype.saveNotes = function () {
        var notesData = document.getElementById("NotesArea").value;
        console.log("=>note data :" + this.notesData);
        this.noteId = guid_1.Guid.generateNotesGuid();
        console.log("=>noteId :" + this.noteId);
        var diagramId = this.diagramService.diagramGuid;
        var locationId = this.diagramService.locationId;
        var tenantId = this.diagramService.tenantId;
        var tenantName = this._authenticator.TenantName;
        this.inspector.saveNotesObservable.next({
            DiagramId: diagramId,
            LocationId: locationId,
            NoteId: this.noteId,
            CreatedDateTime: this.dateAndTime,
            NoteJson: notesData,
            TenantId: tenantId,
            TenantName: tenantName
        });
        document.getElementById("noteid").style.display = "none";
        //document.getElementById("noteid").style.visibility = "hidden";
        document.getElementById("NotesArea").value = "";
    };
    NotesComponent.prototype.CancelNote = function () {
        document.getElementById("noteid").style.display = "none";
    };
    NotesComponent.prototype.editNote = function (noteId) {
        document.getElementById(noteId).disabled = false;
    };
    NotesComponent.prototype.updateNote = function (noteId) {
        var notesData = document.getElementById(noteId).value;
        this.noteId = noteId;
        var diagramId = this.diagramService.diagramGuid;
        var locationId = this.diagramService.locationId;
        var tenantId = this.diagramService.tenantId;
        var tenantName = this._authenticator.TenantName;
        this.inspector.UpdateNotesObservable.next({
            NoteId: this.noteId,
            DiagramId: this.diagramId,
            LocationId: locationId,
            ModifiedDateTime: this.dateAndTime,
            NoteJson: notesData,
            TenantId: tenantId,
            TenantName: tenantName
        });
    };
    NotesComponent.prototype.MouseOver = function (i, event) {
        document.getElementById(i).style.display = "block";
        //this._mouseEnterStream.emit(event);
        //console.log("Event Emitted ..");
        //this._mouseEnterStream.flatMap((e) => {
        //    console.log('_mouseEnterStream.flatMap');
        //    return Observable
        //        .of(e)
        //        .delay(250).takeUntil(this._mouseLeaveStream);
        //}).subscribe(
        //    (e) => {
        //        console.log(i);
        //        document.getElementById(i).style.display = "block";
        //        console.log('yay, it worked!');
        //        console.log(e);
        //    }
        //    );
    };
    NotesComponent.prototype.MouseLeave = function (i, event) {
        this._mouseLeaveStream.emit(event);
        console.log(" After Event Emitted ..");
        document.getElementById(i).style.display = "none";
    };
    NotesComponent.prototype.DeleteNote = function (noteId) {
        console.log("Note Deletion Called.." + noteId);
        this.noteId = noteId;
        this.inspector.DeleteNoteObservable.next(noteId);
    };
    /**
     * this function is used to get device width
     */
    NotesComponent.prototype.ngOnInit = function () {
        this.getCSSJSONData();
    };
    NotesComponent.prototype.onResize = function () {
        this.getCSSJSONData();
    };
    NotesComponent.prototype.getCSSJSONData = function () {
        var _this = this;
        this.http.get("app/css.json")
            .subscribe(function (json) {
            _this.json = json.json();
            _this.createDynamicCSS();
        });
    };
    NotesComponent.prototype.createDynamicCSS = function () {
        var deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        var UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        var currentWidthRatio = this.widthRatio((this.json["UIBackground"])["width"], deviceWidth);
        var currentComponentWidth = this.componentWidth(currentWidthRatio, (this.json["NotesChatPane"])["width"]);
        var currentComponentHeight = this.componentHeight(currentComponentWidth, (this.json["NotesChatPane"])["height"] / (this.json["NotesChatPane"])["width"]);
        var currentComponentLeft = this.componentLeft(currentWidthRatio, (this.json["NotesChatPane"])["left"]);
        var currentComponentTop = this.componentTop(currentComponentLeft, (this.json["NotesChatPane"])["top"] / (this.json["NotesChatPane"])["left"]);
        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#NotesChatPane": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "margin-right": 0,
                "padding": 0,
                "background-color": "#333333",
                "position": "absolute",
                "color": "white"
            }
        }); // end of dynamic css
    };
    NotesComponent.prototype.widthRatio = function (referenceWidth, deviceWidth) {
        return deviceWidth / referenceWidth;
    };
    NotesComponent.prototype.componentWidth = function (ratioWidth, referenceWidth) {
        return referenceWidth * ratioWidth;
    };
    NotesComponent.prototype.componentLeft = function (componentWidthRatio, componentJsonRefLeft) {
        return componentWidthRatio * componentJsonRefLeft;
    };
    NotesComponent.prototype.componentHeight = function (currentComponentWidth, componentJsonRefHeightRatio) {
        return currentComponentWidth * componentJsonRefHeightRatio;
    };
    NotesComponent.prototype.componentTop = function (componentLeft, componentJsonRefTopRatio) {
        return componentLeft * componentJsonRefTopRatio;
    };
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], NotesComponent.prototype, "onResize", null);
    NotesComponent = __decorate([
        core_1.Component({
            selector: 'notes',
            templateUrl: 'app/notes/notes-template.html',
            styleUrls: ['app/notes/note.style.css']
        }), 
        __metadata('design:paramtypes', [notesService_1.NotesService, http_1.Http, diagramService_1.DiagramService, Authenticator_1.Authenticator])
    ], NotesComponent);
    return NotesComponent;
}());
exports.NotesComponent = NotesComponent;
//# sourceMappingURL=notes.component.js.map