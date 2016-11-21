import {Component, Output, EventEmitter, Input,HostListener, OnChanges} from '@angular/core';
import {NotesService} from '../notes/notesService'
import {Guid} from "../area/guid"
import {DiagramComponent} from "../diagram/diagram.component"
import {Notes} from "../notes/Notes";
import {Observable} from "rxjs/Observable";
import {Http} from '@angular/http';
import {DiagramService} from '../diagram/diagramService'
import {Authenticator} from '../auth/Authenticator';

declare var $: any;

@Component({
    selector: 'notes',
    templateUrl: 'app/notes/notes-template.html',
    styleUrls: ['app/notes/note.style.css']
})
export class NotesComponent {
    
    guid: String;
    i: number = 0;
    notesData;
    newNote;
    noteId;
    dateAndTime = new Date();

     diagramId: String;
     locationId: String;
    noteEdit: boolean = false;
    private _mouseEnterStream: EventEmitter<any> = new EventEmitter();
    private _mouseLeaveStream: EventEmitter<any> = new EventEmitter();


    constructor(public inspector: NotesService, public http: Http,
        public diagramService: DiagramService,private _authenticator: Authenticator) {
        this.inspector = inspector;
        this.inspector.showNotesObservable.subscribe((response) => {
            console.log("showNotesObservable :" + response);
           
            this.notesData = response;
            console.log(this.notesData);
          });
    }

    public createNotes;
    createTextArea() {
        //document.getElementById("noteid").style.visibility = "visible";
        document.getElementById("noteid").style.display = "block";
    }     

    saveNotes() {

         var notesData = (<HTMLInputElement>document.getElementById("NotesArea")).value;
         console.log("=>note data :" + this.notesData);
         this.noteId = Guid.generateNotesGuid();
         console.log("=>noteId :" + this.noteId);
         var diagramId = this.diagramService.diagramGuid;
         var locationId = this.diagramService.locationId;
         var tenantId = this.diagramService.tenantId
         var tenantName = this._authenticator.TenantName

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
       
        (<HTMLInputElement>document.getElementById("NotesArea")).value = "";
    }
    CancelNote() {

        document.getElementById("noteid").style.display = "none";

    }


    editNote(noteId) {
      
        (<HTMLInputElement>document.getElementById(noteId)).disabled = false;
               
    }
    updateNote(noteId) {
        var notesData = (<HTMLInputElement>document.getElementById(noteId)).value;
        this.noteId = noteId;
        var diagramId = this.diagramService.diagramGuid;
        var locationId = this.diagramService.locationId;
        var tenantId = this.diagramService.tenantId
        var tenantName = this._authenticator.TenantName

        this.inspector.UpdateNotesObservable.next({
            NoteId: this.noteId,
            DiagramId: this.diagramId,
            LocationId: locationId,
            ModifiedDateTime: this.dateAndTime,
            NoteJson: notesData,
            TenantId: tenantId,
            TenantName: tenantName
        })

    }

    MouseOver(i, event) {
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
    }
    MouseLeave(i, event) {
        this._mouseLeaveStream.emit(event);
        console.log(" After Event Emitted ..");
        document.getElementById(i).style.display = "none";
    }


    DeleteNote(noteId) {

        console.log("Note Deletion Called.." + noteId);
        
        this.noteId = noteId;
        this.inspector.DeleteNoteObservable.next(noteId);


    }



    json: Object;

    /**
     * this function is used to get device width
     */
    ngOnInit() {
        this.getCSSJSONData();
    }

    @HostListener('window:resize')
    onResize() {
        this.getCSSJSONData();
    }

    getCSSJSONData() {
        this.http.get("app/css.json")
            .subscribe(json => {
                this.json = json.json();
                this.createDynamicCSS();
            });
    }

    createDynamicCSS() {
        let deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        let UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        let currentWidthRatio = this.widthRatio((this.json["UIBackground"])["width"], deviceWidth);
        let currentComponentWidth = this.componentWidth(currentWidthRatio, (this.json["NotesChatPane"])["width"]);
        let currentComponentHeight = this.componentHeight(currentComponentWidth, (this.json["NotesChatPane"])["height"] / (this.json["NotesChatPane"])["width"]);
        let currentComponentLeft = this.componentLeft(currentWidthRatio, (this.json["NotesChatPane"])["left"]);
        let currentComponentTop = this.componentTop(currentComponentLeft, (this.json["NotesChatPane"])["top"] / (this.json["NotesChatPane"])["left"]);

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

    }

    widthRatio(referenceWidth: number, deviceWidth: number): number {
        return deviceWidth / referenceWidth;
    }

    componentWidth(ratioWidth: number, referenceWidth: number): number {
        return referenceWidth * ratioWidth;
    }

    componentLeft(componentWidthRatio: number, componentJsonRefLeft: number): number {
        return componentWidthRatio * componentJsonRefLeft;
    }

    componentHeight(currentComponentWidth: number, componentJsonRefHeightRatio: number): number {
        return currentComponentWidth * componentJsonRefHeightRatio;
    }

    componentTop(componentLeft: number, componentJsonRefTopRatio: number): number {
        return componentLeft * componentJsonRefTopRatio;
    }


}