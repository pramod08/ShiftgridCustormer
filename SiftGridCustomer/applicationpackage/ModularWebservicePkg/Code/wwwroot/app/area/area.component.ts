/// <reference path="../../libs/gojs.d.ts" />
import {Component, HostListener, Output, Input, EventEmitter} from '@angular/core';
import {Http, Response} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AreaService} from "./areaService";
import { SearchService} from "../search/searchService";
import {DiagramService}  from "../diagram/diagramService";
import { Guid} from "./guid";
import {AspectRatioService} from '../aspectratiocalculation/AspectRatioService'
import {Authenticator} from '../auth/Authenticator';
import {DiagramData} from "../diagram/DiagramData"

declare var $: any;
@Component({
    selector: 'areacomponent',
    templateUrl: 'app/area/area.template.html',
    styleUrls: ['app/diagramarea/inputElementStyle.css']

})
export class AreaComponent {

    json: Object;
    diagramName;
    diagramData: DiagramData;
    tenantId;
    constructor(public aspectRatio: AspectRatioService,
        private inspector: AreaService, private searchService: SearchService,
        public diagramService: DiagramService, private _authenticator: Authenticator) {
        inspector.CreateAreasDiagram$
            .subscribe(res => this.CreateAreasDiagram(res))

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
        this.aspectRatio.GetCSSJSONData().subscribe(json => {
            this.json = json;
            this.createDynamicCSS();
        })
    }

    private handleError(error: Response) {

    }

    createDynamicCSS() {

        let deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width;
        let UIBackgroundWidthJSON = (this.json["UIBackground"])["width"];
        let currentWidthRatio = this.aspectRatio.WidthRatio((this.json["UIBackground"])["width"], deviceWidth);
        let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["AreaTree"])["width"]);
        let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["AreaTree"])["height"] / (this.json["AreaTree"])["width"]);
        let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["AreaTree"])["left"]);
        let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["AreaTree"])["top"] / (this.json["AreaTree"])["left"]);

        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#AreaTree": {
                "height": currentComponentHeight,
                "width": currentComponentWidth,
                "margin-left": currentComponentLeft,
                "margin-top": currentComponentTop,
                "margin-right": 0,
                "padding": 0,
                "background-color": "#1c1a1a",
                "color": "white",
                "position": "absolute"
            }
        }); // end of dynamic css

    }



    @Output() areaDiagrams: go.Diagram;
    @Output() areaTreeDiagram: go.Diagram;
    @Input() diagrams: go.Diagram;
    @Input() diagramTree: go.Diagram;
    @Input() peopleDiagram: go.Diagram;
    @Input() peopleTreeDiagram: go.Diagram;

    showDiagramProps: boolean;
    showObjProps: boolean;
    guid: String;
    locationId: String;
    i: number = 0;
    // router: Router;
    @Output() myEvent = new EventEmitter();
    @Output() myEvent1 = new EventEmitter();
    @Output() showPaletteEvent = new EventEmitter();
    myTreeView: go.Diagram;

    //locationName: String;


    /// <summary>
    /// Intializing GraphObject and Diagram Object on load the Component.
    /// </summary>


    CreateAreasDiagram(GUID) {
        this.guid = GUID;
        console.log("===> Calling Diagram");
        var self = this;
        console.log("===> Guid : " + this.guid);

        if (this.areaDiagrams != undefined)
            return;
        this.CreateAreaDiagram();
        console.log("===>" + this.areaDiagrams);

        var displayDate = new Date().toLocaleDateString();
        var displayTime = new Date().toLocaleTimeString();
        var dateTime = displayDate + " : " + displayTime

        var diagramData = new DiagramData()
        diagramData.GUID = this.guid;
        diagramData.tenantId = null
        diagramData.name = null
        diagramData.type = "Area"
        diagramData.jurisdiction = null
        diagramData.latitude = null
        diagramData.longitude = null
        diagramData.unitsofMeasurement = null
        diagramData.status = null
        diagramData.company = null
        diagramData.LSD = null
        diagramData.facility = null
        diagramData.field = null
        diagramData.location = null
        diagramData.createdDateTime = dateTime
        diagramData.createdBy = this._authenticator.username
        diagramData.modifiedDateTime = dateTime
        diagramData.modifiedBy = this._authenticator.username
        diagramData.diagramJson = "{\"class\": \"go.GraphLinksModel\",\"nodeKeyProperty\": \"uuid\",\"nodeDataArray\": [],\"linkDataArray\": []}"

        this.diagramService.CreateOrInsertDiagramJson(diagramData, self._authenticator.TenantName)
            .subscribe(
            (res) => {
                console.log(res);
                var diagramData = <DiagramData>res;
                this.diagramData = diagramData

                self.areaDiagrams.model.clear();
                self.areaDiagrams.clear();
                if (diagramData != undefined || diagramData != null)
                    self.areaDiagrams.model.nodeDataArray = go.Model.fromJson(diagramData.diagramJson).nodeDataArray;

                self.areaTreeDiagram.model.nodeDataArray = self.areaDiagrams.model.nodeDataArray;
            });




        //this.inspector.getDiagramJson(this.guid)
        //    .subscribe(
        //    (res) => {
        //        console.log(res);
        //        self.areaDiagrams.model.clear();
        //        self.areaDiagrams.clear();
        //        self.areaDiagrams.model = go.Model.fromJson(res);
        //        self.areaTreeDiagram.model.nodeDataArray = self.areaDiagrams.model.nodeDataArray;

        //        this.myEvent1.emit(this.areaDiagrams);

        //    });
    }

    /* Create Area Diagram Started */
    CreateAreaDiagram() {

        var GO = go.GraphObject.make;



        var diagramDiv = document.getElementById("AreaDiagram");

        //       this.TerminateObjectReferencesFromDiv();
        if (this.areaDiagrams != undefined)
            return;
        var myChangingSelection = false;

        var myDiagram: go.Diagram = GO(go.Diagram, diagramDiv,
            {
                mouseDrop: function (e) { finishDrop(e, null); },
                "commandHandler.archetypeGroupData": { isGroup: true, category: "OfGroups" },
                initialContentAlignment: go.Spot.Default,
                "undoManager.isEnabled": true,
                allowDrop: true, allowDelete: true, allowMove: true, allowCopy: true,
                "draggingTool.dragsLink": true,
                "draggingTool.isGridSnapEnabled": true,
                "linkingTool.isUnconnectedLinkValid": true,
                "ChangedSelection": function (e: go.DiagramEvent) {
                    if (myChangingSelection) return;
                    myChangingSelection = true;
                    var diagnodes = new go.Set<go.Part>();
                    myDiagram.selection.each(function (n) {
                        diagnodes.add(myTreeView.findNodeForData(n.data));
                    });
                    console.log(myTreeView)
                    myTreeView.clearSelection();
                    myTreeView.selectCollection(diagnodes);
                    myChangingSelection = false;
                    if (self.guid != undefined) {
                        var diagramGUID = self.guid;
                        var diagramjson = e.diagram.model.toJson();
                        console.log("===> Modified json :" + diagramjson);
                        //self.inspector.updateAreaInfoObservable.next({
                        //    GUID: diagramGUID,
                        //    DiagramJson: diagramjson
                        //});
                    }
                }

            });


        var myTreeView: go.Diagram =
            GO(go.Diagram, "AreaTree",
                {
                    allowMove: true,  // don't let users mess up the tree
                    allowCopy: true,  // but you might want this to be false
                    "commandHandler.copiesTree": true,
                    "commandHandler.copiesParentKey": true,
                    allowDelete: true, allowDrop: true,  // but you might want this to be false
                    "commandHandler.deletesTree": true,
                    allowHorizontalScroll: false,
                    layout:
                    GO(go.TreeLayout,
                        {
                            alignment: go.TreeLayout.AlignmentStart,
                            angle: 0,
                            compaction: go.TreeLayout.CompactionNone,
                            layerSpacing: 16,
                            layerSpacingParentOverlap: 1,
                            nodeIndent: 2,
                            nodeIndentPastParent: 0.88,
                            nodeSpacing: 0,
                            setsPortSpot: false,
                            setsChildPortSpot: false,
                            arrangementSpacing: new go.Size(0, 0)
                        }), 
                    // when a node is selected in the tree, select the corresponding node in the main diagram
                    "ChangedSelection": function (e) {
                        if (myChangingSelection) return;
                        myChangingSelection = true;
                        var diagnodes = new go.Set<go.Part>();

                        myTreeView.selection.each(function (n) {
                            diagnodes.add(myDiagram.findNodeForData(n.data));
                        });
                        myDiagram.clearSelection();
                        myDiagram.selectCollection(diagnodes);
                        myChangingSelection = false;
                    }
                });
        function finishDrop(e, grp) {
            var ok = (grp !== null
                ? grp.addMembers(grp.diagram.selection, true)
                : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
            if (!ok) e.diagram.currentTool.doCancel();
        }
        // allowing the to horizontal and vertical scrolling to Infinite
        myDiagram.scrollMode = go.Diagram.InfiniteScroll

      //  myDiagram.commandHandler.selectAll();

        //For resizing the icons.
        var nodeResizeAdornmentTemplate =
            GO(go.Adornment, "Spot",
                { locationSpot: go.Spot.Right },
                GO(go.Placeholder),
                GO(go.Shape, { alignment: go.Spot.TopLeft, cursor: "nw-resize", desiredSize: new go.Size(9, 9), fill: "deepskyblue", stroke: "black" }),
                GO(go.Shape, { alignment: go.Spot.TopRight, cursor: "ne-resize", desiredSize: new go.Size(9, 9), fill: "deepskyblue", stroke: "black" }),

                GO(go.Shape, { alignment: go.Spot.BottomLeft, cursor: "se-resize", desiredSize: new go.Size(9, 9), fill: "deepskyblue", stroke: "black" }),
                GO(go.Shape, { alignment: go.Spot.BottomRight, cursor: "sw-resize", desiredSize: new go.Size(9, 9), fill: "deepskyblue", stroke: "black" })
            );

        //For rotate the icons.
        var nodeRotateAdornmentTemplate =
            GO(go.Adornment,
                { locationSpot: go.Spot.Center },
                GO(go.Shape, "Circle", { cursor: "pointer", desiredSize: new go.Size(9, 9), fill: "yellow", stroke: "black" })
            );

        var self = this;

        myDiagram.nodeTemplate =
            GO(go.Node, "Auto",

                {
                    resizable: true, resizeObjectName: "SHAPE",
                    resizeAdornmentTemplate: nodeResizeAdornmentTemplate, selectionAdorned: false,
                    mouseDrop: function (e, nod) { finishDrop(e, nod.containingGroup); }
                },

                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                { contextMenu: GO(go.Adornment) },
                GO(go.Shape, { name: "SHAPE", fill: "white", stroke: "black", strokeWidth: 2 },
                    new go.Binding("stroke", "color"),
                    new go.Binding("fill", "color"),
                    new go.Binding("width", "width"),
                    new go.Binding("height", "height")

                ),
                GO(go.TextBlock, { margin: 5, editable: true },
                    new go.Binding("text", "text").makeTwoWay()
                ),
                {
                    //        mouseEnter: function (e, node) { self.showSmallPorts(node, true); },
                    //     mouseLeave: function (e, node) { self.showSmallPorts(node, false); },
                    toolTip:
                    GO(go.Adornment, "Auto",
                        GO(go.Shape, { fill: "#FFFFCC" }),
                        GO(go.TextBlock, { margin: 2 },  // the tooltip shows the result of calling nodeInfo(data)
                            new go.Binding("text", "text"))
                    )
                }
            );

        function highlightGroup(e, grp, show) {
            if (!grp) return;
            e.handled = true;
            if (show) {
                var tool = grp.diagram.toolManager.draggingTool;
                var map = tool.draggedParts || tool.copiedParts;
                if (grp.canAddMembers(map.toKeySet())) {
                    grp.isHighlighted = true;
                    return;
                }
            }
            grp.isHighlighted = false;
        }

        //GroupTamplate Starting
        myDiagram.groupTemplateMap.add("OfGroups",
            GO(go.Group, "Auto",
                {
                    background: "transparent",
                    // highlight when dragging into the Group
                    mouseDragEnter: function (e, grp, prev) { highlightGroup(e, grp, true); },
                    mouseDragLeave: function (e, grp, next) { highlightGroup(e, grp, false); },
                    computesBoundsAfterDrag: true,
                    mouseDrop: finishDrop,
                    handlesDragDropForMembers: true,
                    //layout:
                    //GO(go.GridLayout,
                    //    {
                    //        wrappingColumn: 1, alignment: go.GridLayout.Position,
                    //        cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
                    //    })

                },
                { resizable: true, resizeObjectName: "Group", resizeAdornmentTemplate: nodeResizeAdornmentTemplate, selectionAdorned: false },

                new go.Binding("background", "isHighlighted", function (h) { return h ? "rgba(255,0,0,0.2)" : "transparent"; }).ofObject(),
                GO(go.Shape, "Rectangle",
                    { name: "Group", fill: null, stroke: "#786c7a", strokeWidth: 2 }),
                GO(go.Panel, "Vertical",
                    GO(go.Panel, "Horizontal",
                        { stretch: go.GraphObject.Horizontal, background: "#616161" },
                        GO("SubGraphExpanderButton",
                            { alignment: go.Spot.Right, margin: 2 }),
                        GO(go.TextBlock,
                            {
                                alignment: go.Spot.Center,
                                editable: true,
                                margin: 3,
                                font: "bold 20px sans-serif",
                                opacity: 0.75,
                                stroke: "white"
                            },
                            new go.Binding("text", "text").makeTwoWay())
                    ),
                    GO(go.Placeholder,
                        { padding: 5, alignment: go.Spot.TopLeft })
                )
            ));


        var myChangingModel = false;  // to protect against recursive model changes


        myDiagram.addModelChangedListener(function (e) {
            if (e.model.skipsUndoManager) return;
            if (myChangingModel) return;
            myChangingModel = true;
            // don't need to start/commit a transaction because the UndoManager is shared with myTreeView
            if (e.modelChange === "nodeGroupKey" || e.modelChange === "nodeParentKey") {
                console.log(myTreeView)
                // handle structural change: group memberships
                var treenode = myTreeView.findNodeForData(e.object);
                if (treenode !== null) treenode.updateRelationshipsFromData();
            } else if (e.change === go.ChangedEvent.Property) {
                console.log(myTreeView)
                var treenode = myTreeView.findNodeForData(e.object);
                if (treenode !== null) treenode.updateTargetBindings();
            } else if (e.change === go.ChangedEvent.Insert && e.propertyName === "nodeDataArray") {
                // pretend the new data isn't already in the nodeDataArray for myTreeView
                myTreeView.model.nodeDataArray.splice(e.newParam, 1);
                // now add to the myTreeView model using the normal mechanisms
                myTreeView.model.addNodeData(e.newValue);
            } else if (e.change === go.ChangedEvent.Remove && e.propertyName === "nodeDataArray") {
                // remove the corresponding node from myTreeView
                var treenode = myTreeView.findNodeForData(e.oldValue);
                if (treenode !== null) myTreeView.remove(treenode);
            }
            myChangingModel = false;
        });

        //myDiagram.addDiagramListener("Modified", function (e) {
        //    var diagramGUID = self.guid;
        //    var diagramjson = myDiagram.model.toJson();
        //    console.log("===> Modified json :" + diagramjson);
        //    self.inspector.updateAreaInfoObservable.next({
        //        GUID: diagramGUID,
        //        DiagramJson: diagramjson
        //    });
        //});

        //Group Template Ending

        //TREE VIEW


        this.areaTreeDiagram = myTreeView;


        myTreeView.model = GO(go.TreeModel, { nodeParentKeyProperty: "group" });

        myTreeView.nodeTemplate =
            GO(go.Node,
                // no Adornment: instead change panel background color by binding to Node.isSelected
                { selectionAdorned: false },
                GO("TreeExpanderButton",
                    {
                        width: 14,
                        "ButtonBorder.fill": "white",
                        "ButtonBorder.stroke": null,
                        "_buttonFillOver": "rgba(0,128,255,0.25)",
                        "_buttonStrokeOver": null
                    }),
                GO(go.Panel, "Horizontal",
                    { position: new go.Point(16, 0) },
                    new go.Binding("background", "isSelected", function (s) { return (s ? "lightblue" : "white"); }).ofObject(),
                    GO(go.TextBlock,
                        { editable: true },
                        new go.Binding("text").makeTwoWay())
                )  // end Horizontal Panel
            );  // end Node

        // without lines
        myTreeView.linkTemplate = GO(go.Link);

        // cannot share the model itself, but can share all of the node data from the main Diagram,
        // pretending the "group" relationship is the "tree parent" relationship

        myTreeView.addModelChangedListener(function (e: go.ChangedEvent) {
            if (e.model.skipsUndoManager) return;
            if (myChangingModel) return;
            myChangingModel = true;

            // don't need to start/commit a transaction because the UndoManager is shared with myDiagram
            if (e.modelChange === "nodeGroupKey" || e.modelChange === "nodeParentKey") {
                // handle structural change: tree parent/children
                var node = myDiagram.findNodeForData(e.object);
                if (node !== null) node.updateRelationshipsFromData();
            } else if (e.change === go.ChangedEvent.Property) {
                // propagate simple data property changes back to the main Diagram
                var node = myDiagram.findNodeForData(e.object);
                if (node !== null) node.updateTargetBindings();
                } else if (e.change === go.ChangedEvent.Insert && e.propertyName === "nodeDataArray") {

                      //pretend the new data isn't already in the nodeDataArray for the main Diagram model
                     myDiagram.model.nodeDataArray.splice(e.newParam, 1);
                      //now add to the myDiagram model using the normal mechanisms
                     myDiagram.model.addNodeData(e.newValue);

            } else if (e.change === go.ChangedEvent.Remove && e.propertyName === "nodeDataArray") {
                // remove the corresponding node from the main Diagram
                var node = myDiagram.findNodeForData(e.oldValue);
                if (node !== null) myDiagram.remove(node);
            }
            myChangingModel = false;

        });

        myDiagram.model.nodeKeyProperty = "uuid"
        myTreeView.model.nodeKeyProperty = "uuid"

        myDiagram.model.makeUniqueKeyFunction = function (model, data) {
            console.log("makeUniqueFunction called")

            return Guid.generateGuid();
        };
        myTreeView.model.makeUniqueKeyFunction = function (model, data) {


            return Guid.generateGuid();
        };





        myTreeView.addDiagramListener("TextEdited", function (e) {
            var selnode = myDiagram.selection.first();
            var locationName = selnode.data.text;
            var locationId = selnode.data.uuid;
            console.log(" myTreeView Location Name after change :" + locationName);
            self.changeTabName(locationId, locationName);

            console.log("===> myTreeView new diagram:" + myDiagram.model.toJson());

            var diagramGUID = self.guid;
            var diagramjson = myDiagram.model.toJson();
            //self.inspector.updateAreaInfoObservable.next({
            //    GUID: diagramGUID,
            //    DiagramJson: diagramjson
            //});
            self.diagramData.diagramJson = diagramjson;
            self.inspector
                .UpdateAreaDiagramJson(self.diagramData, self._authenticator.TenantName)
                .subscribe(res => console.log(res));
        });


        /// Getting tenant Id
        self.inspector.GetTenantId(this._authenticator.TenantName).do(res => console.log(res))
            .subscribe(res => this.tenantId = res)


        myDiagram.addDiagramListener("SelectionDeleting", function (e: go.DiagramEvent) {
            var selnode = myDiagram.selection.first();
            var areaguid = selnode.data.uuid;

            var diagramGUID = self.guid;
            var diagramjson = myDiagram.model.toJson();
            //self.inspector.updateAreaInfoObservable.next({
            //    GUID: diagramGUID,
            //    DiagramJson: diagramjson
            //});
            self.diagramData.diagramJson = diagramjson;
            self.inspector
                .UpdateAreaDiagramJson(self.diagramData, self._authenticator.TenantName)
                .subscribe(res => console.log(res));

            self.searchService.deletingDocObservable.next(areaguid);
        });

        // myTreeView share all of the data with the tree view
        myTreeView.model.nodeDataArray = myDiagram.model.nodeDataArray;

        // share the UndoManager too!
        myTreeView.model.undoManager = myDiagram.model.undoManager;

        // adding custom properties
        this.ListenToAreaEvent(myDiagram)
        this.areaDiagrams = myDiagram;

        this.myEvent.emit(this.areaDiagrams);
    }



    // Icons contains the geometrical representation of all shapes.


    ListenToAreaEvent(myDiagram: go.Diagram) {

        var self = this;
        self.showDiagramProps = true;





        myDiagram.addDiagramListener("ExternalObjectsDropped", function (e) {

            var selected = e.diagram.selection.iterator


            e.diagram.nodes.each(function (n) {
                n.data.key = undefined;
            });

            while (selected.next()) {
                var data = selected.value.data
                console.log(data['isGroup'])
                console.log(<boolean>(data['isGroup']))
                if (!(<boolean>(data['isGroup']))){

                    var selnode = myDiagram.selection.first();
                    var locationName = selnode.data.text;
                    var locationId = selnode.data.uuid;
                    var X = selnode.location.x;
                    var Y = selnode.location.y;
                    self.searchService.InsertObjectDocObservable.next({
                        DiagramId: self.guid,
                        DiagramName: "Areas",
                        LocationId: locationId,
                        TenantId: self._authenticator.TenantName + "-" + self.tenantId,
                        Name: locationName,
                        X: X,
                        Y: Y,
                        Type: "Areas"
                    });
                }
            }

            var diagramGUID = self.guid;
            var diagramjson = myDiagram.model.toJson();
            //self.inspector.updateAreaInfoObservable.next({
            //    GUID: diagramGUID,
            //    DiagramJson: diagramjson
            //});

            self.diagramData.diagramJson = diagramjson;
            self.inspector
                .UpdateAreaDiagramJson(self.diagramData, self._authenticator.TenantName)
                .subscribe(res => console.log(res));

        });

        myDiagram.addDiagramListener("ObjectDoubleClicked", function (e) {
            console.log("Inside AreaDiagram ObjectSingleClicked");
            var selectedparts = e.diagram.selection.iterator

            var selnode = myDiagram.selection.first();

            if (selnode.data.isGroup == true)
                return;

            var locationName = selnode.data.text;
            var locationId = selnode.data.uuid;
            console.log("=>locationId :" + locationId);
            //self.notesInspector.getNotesObservable.next(locationId);
            self.inspector.init(self.areaDiagrams);

            self.TabCreateForArea(locationId, locationName);
        });

        myDiagram.addDiagramListener("TextEdited", function (e) {
            var selnode = myDiagram.selection.first();
            var locationName = selnode.data.text;
            var locationId = selnode.data.uuid;
            console.log("Location Name after change :" + locationName);
            //$("#" + locationId).html(locationName);
            self.changeTabName(locationId, locationName);


            console.log("new diagram:" + myDiagram.model.toJson());
            var X = selnode.location.x;
            var Y = selnode.location.y;
            self.searchService.TexteditingObjectDocObservable.next({
                DiagramId: self.guid,
                DiagramName: "Areas",
                LocationId: locationId,
                TenantId: self._authenticator.TenantName + "-" + self.tenantId,
                Name: locationName,
                X: X,
                Y: Y,
                Type: "Areas"
            });
            var diagramGUID = self.guid;
            var diagramjson = myDiagram.model.toJson();
            //self.inspector.updateAreaInfoObservable.next({
            //    GUID: diagramGUID,
            //    DiagramJson: diagramjson
            //});
            self.diagramData.diagramJson = diagramjson;
            self.inspector
                .UpdateAreaDiagramJson(self.diagramData, self._authenticator.TenantName)
                .subscribe(res => console.log(res));


        });

        myDiagram.addDiagramListener("SelectionDeleted", function (e: go.DiagramEvent) {
            console.log("=====> SelectionDeleted");
            var diagramGUID = self.guid;
            var diagramjson = myDiagram.model.toJson();
            //self.inspector.updateAreaInfoObservable.next({
            //    GUID: diagramGUID,
            //    DiagramJson: diagramjson
            //});
            self.diagramData.diagramJson = diagramjson;
            self.inspector
                .UpdateAreaDiagramJson(self.diagramData, self._authenticator.TenantName)
                .subscribe(res => console.log(res));

        });

      
        this.inspector.init(myDiagram);
    }

    changeTabName(GUID, locationName) {
        $("#" + GUID).html(locationName);
    }

    TabCreateForArea(GUID, locationName) {
        console.log(".inside TabCreateForArea");
        var self = this;
        this.diagramName = locationName;
        self.addTab1(GUID, locationName);
        // self.DisplayDiagram(GUID);
        console.log("GUID : " + GUID);

//        self.diagramService.createDiagramEvent$.next(GUID);

        self.diagramService.createDiagramEvent$.next({ "GUID": GUID, "locationName": locationName });

        $('#tabs a.' + GUID).on('click', function () {
            // Get the tab name

            self.diagramService.createDiagramEvent$.next({ "GUID": GUID, "locationName": locationName });

            // hide all other tabs
            $("#tabs li").removeClass("current");
            // show current tab
            $(this).parent().addClass("current");

            //$("#active1").prop("disabled", false);
            //$("#active2").prop("disabled", false);

        });
            
        $('#tabs a.remove').on('click', { 'class': GUID }, function (e) {

            $(this).parent().remove();
            var guid = e.data.class;
            if (self.diagramService.diagramGuid == guid) {
                self.diagramService._diagram.div = null;
            }
            self.inspector.displayAreaPaletteDiagram$.next(10);
            // if there is no current tab and if there are still tabs left, show the first one
            if ($("#tabs li.current").length == 0 && $("#tabs li").length > 0) {

                // find the first tab
                var firsttab = $("#tabs li:first-child");
                firsttab.addClass("current");

                // get its link name and show related content
                var firsttabid = $(firsttab).find("a.tab").attr("id");
                console.log("firsttabid :" + firsttabid);
               // self.CreateAreasDiagram(firsttabid);

            }
        });

    }

    addTab1(GUID, locationName) {
        console.log("addTab1 Calling... " + GUID);

        var self = this;
        console.log("-showing tab");
        //$('#tabs a.' + GUID).show();

        if ($("#" + GUID).length != 0) {
            //alert("Diagram already opened.");
            //$("#" + GUID).show();
            //return;
            $("#" + GUID).parent().remove();
        }

        //self.createDiagramEvent.emit(GUID);
        $("#tabs li").removeClass("current");
        // GO("#myDiagramDiv p").hide();

        $("#tabs").append("<li class='current'><a class='" + GUID + "' id='" + GUID + "' >" + locationName + "</a><a  class='remove'>x</a></li>");

    }


}