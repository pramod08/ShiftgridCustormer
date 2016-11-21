/// <reference path="../../libs/gojs.d.ts" />
/// <reference path="../../libs/jquery.d.ts" />
import {Component, Injectable, Output, EventEmitter, AfterViewInit, OnInit, ViewChild, Directive, Input} from "@angular/core"
import {IconsComponent} from "./icons"
import { DiagramService} from "./diagramService"
import {NotesService} from '../notes/notesService'
import {Guid} from "../area/guid"
import {AreaService} from '../area/areaService'
import {AspectRatioService} from '../aspectratiocalculation/AspectRatioService'
import {Authenticator} from '../auth/Authenticator';

//import {DiagramData} from '../../Model/DiagramData';
import {Observable} from "rxjs/Rx"
import {DiagramData} from "./DiagramData"
import {LocationData} from "./LocationData"
//import {Router} from "@angular/router"
import { SearchService} from "../search/searchService";

@Component({
    selector: "diagram",
    templateUrl: 'app/diagram/diagram.component.html',
    styleUrls: ["/inputElementStyle.css"]
})
/// <summary>
/// Intialize Diagram Object and Adding properties to the modelData.
/// </summary>

export class DiagramComponent {

    
    @Input() areaDiagrams: go.Diagram;
    @Input() areaTreeDiagram: go.Diagram;
    @Output() diagrams: go.Diagram;
    @Output() diagramTree: go.Diagram;
    @Input() peopleDiagram: go.Diagram;
    @Input() peopleTreeDiagram: go.Diagram;
    diagramName;
    @ViewChild("myDiagramDiv") div;
    notesInspector: NotesService;
    selectedPartInfo;
    showDiagramProps: boolean;
    showObjProps: boolean;
    guid: String;
    locationId: String;
    i: number = 10;
    // router: Router;
    @Output() myEvent = new EventEmitter();
    @Output() myEvent1 = new EventEmitter();
    @Output() showPaletteEvent = new EventEmitter();
    @Output() showArea = new EventEmitter();
    // @Input() myTreeView: go.Diagram;
    myTreeView: go.Diagram;
    diagramData: DiagramData
    //locationName: String;

    /// <summary>
    /// Injecting Inspector to the Diagram component
    /// </summary>
    /// <param name="inspector">Contains angular http post and get methods.</param>
    constructor(private inspector: DiagramService, notesInspector: NotesService,
        private searchService: SearchService, public areaService: AreaService,
        public aspectRatio: AspectRatioService,private _authenticator: Authenticator) {
        this.notesInspector = notesInspector;

        inspector.createDiagramEvent$.subscribe(res => {
      //      areaService.showEnterprisePane$.next(10);
            areaService.displayDiagram$.next(10);
            areaService.displayDiagramTree$.next(10);

            this.DisplayDiagram(res);
        })
        searchService.createDiagram$
            .subscribe(res => {
                areaService.showEnterprisePane$.next(10);
                areaService.displayDiagram$.next(10);
                areaService.displayDiagramTree$.next(10);
                var guid
                var Name
                if (res[0]['Type'] === "Areas") {
                    guid = res[0]["LocationId"];
                    Name = res[0]["Name"];
                }
                if (res[0]['Type'] === "Location Group") {
                    guid = res[0]["DiagramId"];
                    Name = res[0]["DiagramName"];
                }
                console.log("guid in diagram.componets", guid);
                this.TabCreateForArea(guid, Name)
            }, err => console.log(err),
            () => console.log("Created diagram obserable completed"));

        searchService.createDiagramWithLocation$
            .subscribe(res => {
                areaService.showEnterprisePane$.next(10);
                areaService.displayDiagram$.next(10);
                areaService.displayDiagramTree$.next(10);
                console.log(res)
                var locationId = res[0]["LocationId"];
                var groupNode = this.diagrams.findNodeForKey(locationId);

                this.diagrams.position = groupNode.part.actualBounds.position


            }, err => console.log(err),
            () => console.log("Created diagram obserable completed"));
    }
    //Making port for linking.
    makePort(name, spot, output, input) {
        var GO = go.GraphObject.make;

        return GO(go.Shape, "Square",
            {
                fill: null,
                stroke: null,
                strokeWidth: 1.5,
                desiredSize: new go.Size(7, 7),
                alignment: spot,
                alignmentFocus: spot,
                portId: name,
                fromSpot: spot, toSpot: spot,
                fromLinkable: output, toLinkable: input,
                cursor: "pointer"
            });
    }

    //showing the linking ports.
    showSmallPorts(node, show) {
        node.ports.each(function (port) {
            if (port.portId !== "") {
                port.fill = show ? "white" : null;
                port.stroke = show ? "black" : null;
            }
        });
    }

    // Icons contains the geometrical representation of all shapes.
    DisplayDiagram(GUID) {
    //    this.guid = GUID;
        var self = this;
        console.log("GUID from area.diagram : " + GUID);
        console.log("display guid id " + GUID["GUID"]);
        console.log("display Name id " + GUID["locationName"]);

        this.guid = GUID["GUID"];
        this.diagramName = GUID["locationName"];


        if (self.diagrams != null || self.diagrams != undefined)
            self.diagrams.div = null
        if (self.diagramTree != null || self.diagramTree != undefined)
            self.diagramTree.div = null

        this.CreateDiagram();
        console.log("===>" + this.diagrams);

        //this.inspector.getDiagramJson(this.guid)
        //    .subscribe(
        //    (res) => {
        //        console.log(res);

        //        self.diagrams.model.clear();
        //        self.diagrams.clear();
        //        self.diagrams.model = go.Model.fromJson(res);
        //        self.myTreeView.model.nodeDataArray = self.diagrams.model.nodeDataArray;

        //    });
       // self.notesInspector.getNotesObservable.next(this.guid);
    }

    CreateDiagram() {

        console.log("Create Diagram Calling ");
        var GO = go.GraphObject.make;
        var diagramDiv = document.getElementById("diagramDiv");

        console.log(GO)
        console.log(diagramDiv)

        this.showPaletteEvent.emit(false);

        // const diagramDiv = this.div.nativeElement;
        //    this.TerminateObjectReferencesFromDiv();
       
        var myChangingSelection = false;

        function finishDrop(e, grp) {
            var ok = (grp !== null
                ? grp.addMembers(grp.diagram.selection, true)
                : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
            if (!ok) e.diagram.currentTool.doCancel();
        }

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
        // instatiate Diagram with diagramDiv element, grid. 
        var myDiagram: go.Diagram = GO(go.Diagram, diagramDiv,
            {
                mouseDrop: function (e) { finishDrop(e, null); },
                initialContentAlignment: go.Spot.Default,
                "undoManager.isEnabled": true,
                "allowDrop": true, "allowDelete": true, "draggingTool.dragsLink": true,
                "linkingTool.portGravity": 20, "relinkingTool.portGravity": 20,
                "draggingTool.isGridSnapEnabled": true, "linkingTool.isUnconnectedLinkValid": true,
                "relinkingTool.isUnconnectedLinkValid": true,
                "relinkingTool.fromHandleArchetype":
                GO(go.Shape, "Circle",
                    {
                        segmentIndex: 0, cursor: "pointer", desiredSize: new go.Size(8, 8),
                        fill: "deepskyblue", stroke: "black"
                    }),
                "relinkingTool.toHandleArchetype":
                GO(go.Shape, "Circle",
                    {
                        segmentIndex: -1, cursor: "pointer", desiredSize: new go.Size(8, 8),
                        fill: "deepskyblue", stroke: "black"
                    }),
                "linkReshapingTool.handleArchetype":
                GO(go.Shape, "Square",
                    {
                        desiredSize: new go.Size(7, 7),
                        fill: "yellow", stroke: "black"
                    }),
                 // allow Ctrl-G to call groupSelection()
                "commandHandler.archetypeGroupData": { name: "Group", isGroup: true, color: "blue" },
                "ChangedSelection": function (e) {
                    if (myChangingSelection) return;
                    myChangingSelection = true;
                    var diagnodes = new go.Set < go.Part>();
                    myDiagram.selection.each(function (n) {
                        diagnodes.add(myTreeView.findNodeForData(n.data));
                    });
                    myTreeView.clearSelection();
                    myTreeView.selectCollection(diagnodes);
                    myChangingSelection = false;
                }
            });

        var myTreeView: go.Diagram =
            GO(go.Diagram, "LocationTree",
                {
                    allowMove: false,  // don't let users mess up the tree
                    allowCopy: true,  // but you might want this to be false
                    "commandHandler.copiesTree": true,
                    "commandHandler.copiesParentKey": true,
                    allowDelete: true,  // but you might want this to be false
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
                        var diagnodes = new go.Set < go.Part>();
                        myTreeView.selection.each(function (n) {
                            diagnodes.add(myDiagram.findNodeForData(n.data));
                        });
                        myDiagram.clearSelection();
                        myDiagram.selectCollection(diagnodes);
                        myChangingSelection = false;
                    }
                });


        this.diagramTree = myTreeView;


        // allowing the to horizontal and vertical scrolling to Infinite
        myDiagram.scrollMode = go.Diagram.InfiniteScroll

 //       myDiagram.commandHandler.selectAll();

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
                resizable: true,
                resizeAdornmentTemplate: nodeResizeAdornmentTemplate, selectionAdorned: false,
                mouseDrop: function (e, nod) { finishDrop(e, nod.containingGroup); }
            },
            {
                rotatable: true, 
                rotateAdornmentTemplate: nodeRotateAdornmentTemplate, selectionAdorned: false
            },
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                { contextMenu: GO(go.Adornment) },
                GO(go.Shape, { fill: "white", stroke: "black", strokeWidth: 2 },
                    new go.Binding("stroke", "color"),
                    new go.Binding("fill", "dColor"),
                    new go.Binding("width", "width"),
                    new go.Binding("height", "height"),
                    new go.Binding("geometryString", "name", self.geoFunc),
                    {
                        portId: "", cursor: "pointer", fromLinkable: true, fromLinkableSelfNode: true, fromLinkableDuplicates: true,
                        toLinkable: true, toLinkableSelfNode: true, toLinkableDuplicates: true
                    }),
                GO(go.TextBlock, { margin: 5, text: "" }),
                this.makePort("T", go.Spot.Top, true, true),
                this.makePort("L", go.Spot.Left, true, true),
                this.makePort("R", go.Spot.Right, true, true),
                this.makePort("B", go.Spot.Bottom, true, false),
                {
                    mouseEnter: function (e, node) { self.showSmallPorts(node, true); },
                    mouseLeave: function (e, node) { self.showSmallPorts(node, false); },
                    toolTip:
                    GO(go.Adornment, "Auto",
                        GO(go.Shape, { fill: "#FFFFCC" }),
                        GO(go.TextBlock, { margin: 2 },  // the tooltip shows the result of calling nodeInfo(data)
                            new go.Binding("text", "name"))
                    )
                }
                //{ // handle dragging a Node onto another Node.
                //    mouseDragEnter: function (e, node, prev) {

                //    },
                //    mouseDragLeave: function (e, node, next) {
                //        var selnode = myDiagram.selection.first();
                //        console.log("==>mouseDrop selected node" + selnode);

                //        var model = myDiagram.model;
                //        model.addLinkData({ from: node.data.key, to: selnode.data.key });
                //        console.log(model.toJson());
                //    },
                //    mouseDrop: function (e, node) {

                //    }
                //}
            );


        var linkSelectionAdornmentTemplate =
            GO(go.Adornment, "Link",
                GO(go.Shape,
                    { isPanelMain: true, strokeWidth: 0 }, new go.Binding("stroke", "", function (v) { return "green"; }))
            );

        myDiagram.linkTemplate =
            GO(go.Link,
                {
                    routing: go.Link.Orthogonal,
                    corner: 5,
                    curve: go.Link.JumpOver,
                    toShortLength: 2
                },
                {
                    selectable: true,
                    selectionAdornmentTemplate: linkSelectionAdornmentTemplate
                },
                { reshapable: true },
                { toShortLength: 3, relinkableFrom: true, relinkableTo: true },
                { // handle dragging a Node onto a Link to (maybe) change the reporting relationship
                    mouseDragEnter: function (e, link, prev) {

                        var lshape = link.findObject("LSHAPE");
                        lshape._prevFill = lshape.stroke;  // remember the original brush
                        lshape.stroke = "pink";

                    },
                    mouseDragLeave: function (e, link, next) {

                        var lshape = link.findObject("LSHAPE");
                        lshape.stroke = lshape._prevFill;  // restore the original brush

                    },
                    mouseDrop: function (e, link) {

                        var diagram = link.diagram;

                        var selnode = myDiagram.selection.first();
                        var tnode = link.toNode;


                        link.toNode = selnode;
                        //var larrow = link.findObject("LARROW");
                        //larrow.toArrow = "";

                        var model = myDiagram.model;
                        model.startTransaction("reconnect link");

                       (<go.GraphLinksModel>model).addLinkData({ from: selnode.data.uuid, to: tnode.data.uuid });
                        console.log(model.toJson());

                        model.commitTransaction("reconnect link");
                    }
                },

                // allow the user to relink existing links
                GO(go.Shape, { name: "LSHAPE", strokeWidth: 4 }, new go.Binding("stroke", "", function (v) { return "black"; })),
                GO("Shape", { name: "LARROW", strokeWidth: 3, toArrow: "Standard" }, new go.Binding("stroke", "", function (v) { return "black"; })),
                {
                    contextMenu: GO(go.Adornment, "Vertical",
                        GO("ContextMenuButton",
                            GO(go.TextBlock, "Reverse"),
                            {
                                click: function (e: go.InputEvent, obj: go.Panel) {

                                    var linkData = e.diagram.selection.first().data;
                                    e.diagram.startTransaction("Reversing link started");

                                    var from = linkData["from"]
                                    var to = linkData["to"]
                                    e.diagram.model.setDataProperty(linkData, "from", to);
                                    e.diagram.model.setDataProperty(linkData, "to", from);
                                    e.diagram.startTransaction("Reversing link completed");

                                }
                            }))
                }
            );

        // Groups consist of a title in the color given by the group node data
        // above a translucent gray rectangle surrounding the member parts

        myDiagram.groupTemplate =
            GO(go.Group, "Vertical",
            new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                    {
                    selectionObjectName: "PANEL",  // selection handle goes around shape, not label
                    ungroupable: true,             // enable Ctrl-Shift-G to ungroupmydia a selected Group
                    mouseDragEnter: function (e, grp, prev) { highlightGroup(e, grp, true); },
                    mouseDragLeave: function (e, grp, next) { highlightGroup(e, grp, false); },
                    mouseDrop: finishDrop,
                    handlesDragDropForMembers: true,
                    computesBoundsAfterDrag: true
                }, GO(go.TextBlock,
                    {
                        font: "bold 19px sans-serif",
                        isMultiline: false,  // don't allow newlines in text
                        editable: true  // allow in-place editing by user
                    },
                    new go.Binding("text", "name").makeTwoWay(),
                    new go.Binding("stroke", "color")
                ),
                GO(go.Panel, "Auto",
                    { name: "PANEL" },
                    GO(go.Shape, "Rectangle",   // the rectangular shape around the members
                        { fill: "white", stroke: "gray", strokeWidth: 3 }
                    ),
                    GO(go.Placeholder, { padding: 10 })
                )
            );
        var myChangingModel = false;  // to protect against recursive model changes



        myDiagram.addModelChangedListener(function (e) {
            if (e.model.skipsUndoManager) return;
            if (myChangingModel) return;
            myChangingModel = true;
            // don't need to start/commit a transaction because the UndoManager is shared with myTreeView
            if (e.modelChange === "nodeGroupKey" || e.modelChange === "nodeParentKey") {
                // handle structural change: group memberships
                var treenode = myTreeView.findNodeForData(e.object);
                if (treenode !== null) treenode.updateRelationshipsFromData();
            } else if (e.change === go.ChangedEvent.Property) {
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



        //TREE VIEW


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
                    new go.Binding("background", "isSelected", function (s) { return (s ? "lightblue" : "black"); }).ofObject(),
                    GO(go.Picture,
                        {
                            width: 18, height: 18,
                            margin: new go.Margin(0, 4, 0, 0),
                            imageStretch: go.GraphObject.Uniform
                        }),
                    GO(go.TextBlock,
                        { editable: true, stroke: "white" },
                        new go.Binding("text", "name").makeTwoWay())
                )  // end Horizontal Panel
            );  // end Node



        // without lines
        myTreeView.linkTemplate = GO(go.Link);




        // cannot share the model itself, but can share all of the node data from the main Diagram,
        // pretending the "group" relationship is the "tree parent" relationship
        myTreeView.model = GO(go.TreeModel, { nodeParentKeyProperty: "group" });

        myTreeView.addModelChangedListener(function (e) {
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
                // pretend the new data isn't already in the nodeDataArray for the main Diagram model
                myDiagram.model.nodeDataArray.splice(e.newParam, 1);
                // now add to the myDiagram model using the normal mechanisms
                myDiagram.model.addNodeData(e.newValue);
            } else if (e.change === go.ChangedEvent.Remove && e.propertyName === "nodeDataArray") {
                // remove the corresponding node from the main Diagram
                var node = myDiagram.findNodeForData(e.oldValue);
                if (node !== null) myDiagram.remove(node);
            }
            myChangingModel = false;
        });

        this.myTreeView = myTreeView;

        myDiagram.model.nodeKeyProperty = "uuid"
        myTreeView.model.nodeKeyProperty = "uuid"

        myDiagram.model.makeUniqueKeyFunction = function (model, data) {
            console.log("makeUniqueFunction called")

            return Guid.generateGuid();
        };
        myTreeView.model.makeUniqueKeyFunction = function (model, data) {


            return Guid.generateGuid();
        };


        this.myTreeView.model.nodeDataArray = myDiagram.model.nodeDataArray


        myTreeView.model.undoManager = myDiagram.model.undoManager;

        this.diagrams = myDiagram;

        var displayDate = new Date().toLocaleDateString();
        var displayTime = new Date().toLocaleTimeString();
        var dateTime = displayDate + " : " + displayTime

        var diagramData = new DiagramData()
        diagramData.GUID = this.guid;
        diagramData.tenantId = null
        diagramData.name = null
        diagramData.type = "Location"
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

        this.inspector.CreateOrInsertDiagramJson(diagramData, this._authenticator.TenantName)
            .subscribe(
            (res) => {
 
                console.log(res);
                //  self.diagrams.model.clear();
                // self.diagrams.clear();
                this.diagramData = res;
                this.inspector.tenantId = this.diagramData.tenantId;
                self.diagrams.model.nodeDataArray = go.Model.fromJson(this.diagramData.diagramJson).nodeDataArray;
                (<go.GraphLinksModel>self.diagrams.model).linkDataArray = (<go.GraphLinksModel>go.Model.fromJson(this.diagramData.diagramJson)).linkDataArray;

                //                self.diagrams.model = go.Model.fromJson(res).nodeDataArray;

                this.myTreeView.model.nodeDataArray = myDiagram.model.nodeDataArray

            });



        //this.inspector.GetDiagramJsonByTenantId(this.guid, this._authenticator.TenantName )
        //    .subscribe(
        //    (res) => {
        //        console.log(res);

        //        //  self.diagrams.model.clear();
        //        // self.diagrams.clear();
        //        self.diagrams.model.nodeDataArray = go.Model.fromJson(res).nodeDataArray;
        //        (<go.GraphLinksModel>self.diagrams.model).linkDataArray = (<go.GraphLinksModel>go.Model.fromJson(res)).linkDataArray;

        //        //                self.diagrams.model = go.Model.fromJson(res).nodeDataArray;

        //        this.myTreeView.model.nodeDataArray = myDiagram.model.nodeDataArray

        //    });

//        this.inspector.getDiagramJson(this.guid)
//            .subscribe(
//            (res) => {
//                console.log(res);

//              //  self.diagrams.model.clear();
//                // self.diagrams.clear();
//                self.diagrams.model.nodeDataArray = go.Model.fromJson(res).nodeDataArray;
//                (<go.GraphLinksModel>self.diagrams.model).linkDataArray = (<go.GraphLinksModel>go.Model.fromJson(res)).linkDataArray;

////                self.diagrams.model = go.Model.fromJson(res).nodeDataArray;

//              this.myTreeView.model.nodeDataArray = myDiagram.model.nodeDataArray

//            });
        // adding custom properties
        this.ListenToEvent(myDiagram);

    }

    ListenToEvent(myDiagram: go.Diagram) {

        var self = this;
        self.showDiagramProps = true;

        //myDiagram.addDiagramListener("ChangedSelection", function (e: go.DiagramEvent) {
        //    console.log("**guid :" + self.guid);
        //    console.log("**guid length:" + self.guid.length);
        //    if (self.guid.length > 4) {

        //        var diagramGUID = self.guid;
        //        var diagramjson = myDiagram.model.toJson();
        //        self.inspector.updateAreaInfoObservable.next({
        //            GUID: diagramGUID,
        //            DiagramJson: diagramjson
        //        });
        //    }
        //});

        myDiagram.addDiagramListener("BackgroundSingleClicked", function (e: go.DiagramEvent) {

            //self.inspector.createDiagramInfoObservable.next(
            //    self.guid
            //);
        }); 

        myDiagram.addDiagramListener("ObjectSingleClicked", function (e) {
            console.log("Inside NewDiagram ObjectSingleClicked");

            var selectedparts = e.diagram.selection.iterator;
            var selnode = myDiagram.selection.first();
            var diagramGUID = self.guid;

            while (selectedparts.next()) {
                var data = selectedparts.value.data;
                var locationId = selnode.data.key;
                self.locationId = locationId;
                self.inspector.locationId = data["uuid"]
                console.log("Selected Node Id : " + locationId);

                //For Info Pane.
                self.inspector.getInfoPaneObservable.next(
                    JSON.stringify({
                        LocationId: data["uuid"],
                        NodeType: data["nodeType"],
                        tenantName: self._authenticator.TenantName,
                        tenantId: self.diagramData.tenantId
                    })
                );

                //For notes pane.
                self.notesInspector.getNotesObservable.next(data["uuid"]);
            }
        });
     

        myDiagram.addDiagramListener("ExternalObjectsDropped", function (e) {
            console.log("---> ExternalObjectsDropped");
            e.diagram.nodes.each(function (n) {
                n.data.key = undefined;
            });
            var isGroup = e.diagram.selection.first().data['isGroup']
            if (!isGroup) {
                

                var selectnode = myDiagram.selection.first();
                if (selectnode.data.type == "meter") {
                    myDiagram.startTransaction("create node");
                    var p = selectnode.location.copy();
                  //  var nguid = Guid.generateGuid();
                //    var toData = { key: nguid, name: "localMounted", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50, loc: "0 0", category: "simple" };
                    var toData = {  name: "localMounted", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50, loc: "0 0", category: "simple" };

                    p.y = p.y - 70;
                    toData.loc = go.Point.stringify(p);
                    myDiagram.model.addNodeData(toData);
             //       (<go.GraphLinksModel>myDiagram.model).addLinkData({ from: selectnode.data.key, to: toData.key });
                    myDiagram.commitTransaction("create node");
                    var newnode = myDiagram.findNodeForData(toData);
                }


                var selected = e.diagram.selection.iterator;
                while (selected.next()) {
                    var data = selected.value.data
                    var loc = new LocationData();
                    console.log(data["key"])
               //    loc.LocationId = Guid.generateGuid()
                    loc.LocationId = data["uuid"]
                    loc.DiagramId = "Id1";
                    loc.CreatedBy = 'User1';
                    loc.CreatedDateTime = '' + new Date().toDateString()
                    loc.ModifiedBy = 'User1';
                    loc.ModifiedDataTime = '' + new Date().toDateString()
                    loc.Type = 'Type1';
                    loc.Latitude = '' + selected.value.position.x;
                    loc.Longitude = '' + selected.value.position.y;
                    loc.XCoordinate = '' + selected.value.position.x;
                    loc.YCoordinate = '' + selected.value.position.y;
                    loc.TieInStatus = '';
                    loc.Status = '';
                    loc.IsMissingField = true;

                    self.diagrams.startTransaction("Modifying the Object Node Json data");
                 //   self.diagrams.model.setDataProperty(data, "key", loc.LocationId);

                    self.diagrams.model.setDataProperty(data, "nodeType", data["name"]);
                    self.diagrams.model.setDataProperty(data, "locationInfo", JSON.parse(JSON.stringify(loc)));
                    self.diagrams.commitTransaction("Object's Json data modified");

                    self.inspector.createObjectInfoObservable.next({
                        XCoordinate: selected.value.position.x,
                        YCoordinate: selected.value.position.y,
                        LocationId: loc.LocationId,
                        NodeType: data.name,
                        tenantName: self._authenticator.TenantName,
                        tenantId: self.diagramData.tenantId
                    });
                }


                var diagramGUID = self.guid;
                var diagramjson = myDiagram.model.toJson();
                //self.inspector.updateAreaInfoObservable.next({
                //    GUID: diagramGUID,
                //    DiagramJson: diagramjson
                //});
                self.diagramData.diagramJson = diagramjson;
                self.areaService
                    .UpdateAreaDiagramJson(self.diagramData, self._authenticator.TenantName)
                    .subscribe(res => console.log(res));
            }
        });

        myDiagram.addDiagramListener("Modified", function (e: go.DiagramEvent) {
            console.log(e.diagram.model.toJson())
        });

        myDiagram.addDiagramListener("LinkDrawn", function (e: go.DiagramEvent) {
            console.log("**guid :" + self.guid);
            console.log("**guid length:" + self.guid.length);

            var diagramGUID = self.guid;
            var diagramjson = myDiagram.model.toJson();
            //self.inspector.updateAreaInfoObservable.next({
            //    GUID: diagramGUID,
            //    DiagramJson: diagramjson
            //});
            self.diagramData.diagramJson = diagramjson;
            self.areaService
                .UpdateAreaDiagramJson(self.diagramData, self._authenticator.TenantName)
                .subscribe(res => console.log(res));
        });

        //myDiagram.addModelChangedListener(function (evt) {
        //    // ignore unimportant Transaction events
        //    if (!evt.isTransactionFinished) return;
        //    var txn = evt.object;  // a Transaction
        //    if (txn === null) return;
        //    // iterate over all of the actual ChangedEvents of the Transaction
        //    txn.changes.each(function (e) {
        //        // record node insertions and removals
        //        if (e.change === go.ChangedEvent.Property) {
        //            if (e.modelChange === "linkFromKey" || e.modelChange === "linkToKey") {
        //                console.log("========>" + evt.propertyName + " changed From key of link: " +
        //                    e.object + " from: " + e.oldValue + " to: " + e.newValue);

        //                console.log("**guid :" + self.guid);
        //                console.log("**guid length:" + self.guid.length);

        //                var diagramGUID = self.guid;
        //                var diagramjson = myDiagram.model.toJson();
        //                self.inspector.updateAreaInfoObservable.next({
        //                    GUID: diagramGUID,
        //                    DiagramJson: diagramjson
        //                });

        //            } else if (e.change === go.ChangedEvent.Insert && e.modelChange === "linkDataArray") {
        //                console.log(evt.propertyName + " added link: " + e.newValue);
        //            } else if (e.change === go.ChangedEvent.Remove && e.modelChange === "linkDataArray") {
        //                console.log(evt.propertyName + " removed link: " + e.oldValue);
        //            }
        //        }
        //    });
        //});

        myDiagram.addDiagramListener("LinkRelinked", function (e: go.DiagramEvent) {
            console.log("**guid :" + self.guid);
            console.log("**guid length:" + self.guid.length);

            var diagramGUID = self.guid;
            var diagramjson = myDiagram.model.toJson();
            //self.inspector.updateAreaInfoObservable.next({
            //    GUID: diagramGUID,
            //    DiagramJson: diagramjson
            //});
            self.diagramData.diagramJson = diagramjson;
            self.areaService
                .UpdateAreaDiagramJson(self.diagramData, self._authenticator.TenantName)
                .subscribe(res => console.log(res));
        });

        myDiagram.addDiagramListener("PartResized", function (e: go.DiagramEvent) {
            console.log("**guid :" + self.guid);
            console.log("**guid length:" + self.guid.length);

            var diagramGUID = self.guid;
            var diagramjson = myDiagram.model.toJson();
            //self.inspector.updateAreaInfoObservable.next({
            //    GUID: diagramGUID,
            //    DiagramJson: diagramjson
            //});
            self.diagramData.diagramJson = diagramjson;
            self.areaService
                .UpdateAreaDiagramJson(self.diagramData, self._authenticator.TenantName)
                .subscribe(res => console.log(res));
        });

        myDiagram.addDiagramListener("PartRotated", function (e: go.DiagramEvent) {
            console.log("**guid :" + self.guid);
            console.log("**guid length:" + self.guid.length);

            var diagramGUID = self.guid;
            var diagramjson = myDiagram.model.toJson();

            //self.inspector.updateAreaInfoObservable.next({
            //    GUID: diagramGUID,
            //    DiagramJson: diagramjson
            //});
            self.diagramData.diagramJson = diagramjson;
            self.areaService
                .UpdateAreaDiagramJson(self.diagramData, self._authenticator.TenantName)
                .subscribe(res => console.log(res));
        });

        myDiagram.addDiagramListener("SelectionMoved", function (e: go.DiagramEvent) {
            console.log("**guid :" + self.guid);
            console.log("**guid length:" + self.guid.length);

            var diagramGUID = self.guid;
            var diagramjson = myDiagram.model.toJson();
            //self.inspector.updateAreaInfoObservable.next({
            //    GUID: diagramGUID,
            //    DiagramJson: diagramjson
            //});
            self.diagramData.diagramJson = diagramjson;
            self.areaService
                .UpdateAreaDiagramJson(self.diagramData, self._authenticator.TenantName)
                .subscribe(res => console.log(res));
        });

        myDiagram.addDiagramListener("SelectionDeleted", function (e: go.DiagramEvent) {
            console.log("**guid :" + self.guid);
            console.log("**guid length:" + self.guid.length);

            var diagramGUID = self.guid;
            var diagramjson = myDiagram.model.toJson();
            //self.inspector.updateAreaInfoObservable.next({
            //    GUID: diagramGUID,
            //    DiagramJson: diagramjson
            //});
            self.diagramData.diagramJson = diagramjson;
            self.areaService
                .UpdateAreaDiagramJson(self.diagramData, self._authenticator.TenantName)
                .subscribe(res => console.log(res));
        });

        myDiagram.addDiagramListener("SelectionGrouped", function (e: go.DiagramEvent) {
            console.log("=====> SelectionGrouped");
            console.log("**guid :" + self.guid);
            console.log("**guid length:" + self.guid.length);


            //e.diagram.startTransaction("Modifying the Object Node Json data");
            //e.diagram.model.setDataProperty(e.diagram.selection.first().data, "key", Guid.generateGuid());
            //e.diagram.startTransaction("Object's Json data modified");
           // console.log("key", e.diagram.selection.first().data["key"]);
            var selnode = myDiagram.selection.first();
            var locationName = selnode.data.text;

            var diagramGUID = self.guid;
            var diagramName = self.diagramName;
            var groupId = e.diagram.selection.first().data["uuid"];
            var GroupName = e.diagram.selection.first().data["name"];
            var X = selnode.location.x;
            var Y = selnode.location.y;

            console.log("locationName: " + locationName);
            console.log("DiagramId :" + self.guid);
            console.log("diagramName :" + self.diagramName);
            console.log("diagramNam :" + diagramName);
            console.log("group ID :" + groupId);
            console.log("Name :" + GroupName);
            console.log("X:" + X);
            console.log("Y:" + Y);

            self.searchService.InsertLoc_GroupDocObservable.next({
                DiagramId: diagramGUID,
                DiagramName: diagramName,
                LocationId: groupId,
                TenantId: self._authenticator.TenantName + "-" + self.inspector.tenantId,
                Name: GroupName,
                X: X,
                Y: Y,
                Type: "Location Group"
            }); 

            var diagramGUID = self.guid;
            var diagramjson = myDiagram.model.toJson();
            //self.inspector.updateAreaInfoObservable.next({
            //    GUID: diagramGUID,
            //    DiagramJson: diagramjson
            //});
            //self.inspector.updateAreaInfoObservable.next({
            //    GUID: diagramGUID,
            //    DiagramJson: diagramjson
            //});

            self.diagramData.diagramJson = diagramjson;
            self.areaService
                .UpdateAreaDiagramJson(self.diagramData, self._authenticator.TenantName)
                .subscribe(res => console.log(res));


        });

        myDiagram.addDiagramListener("TextEdited", function (e: go.DiagramEvent) {
            var selnode = myDiagram.selection.first();
            var locationName = selnode.data.text;
            var locationId = selnode.data.key;

            var diagramName = self.diagramName;
            var GroupName = e.diagram.selection.first().data["name"];
            var groupId = e.diagram.selection.first().data["uuid"];

            console.log("Text Editing Json :" + myDiagram.model.toJson());
            var X = selnode.location.x;
            var Y = selnode.location.y;

            console.log("locationName: " + locationName)
            console.log("self.guid :" + self.guid);
            console.log("self.diagramName :" + self.diagramName);
            console.log("diagramName :" + diagramName);
            console.log("group ID :" + groupId);
            console.log("Name :" + GroupName);
            console.log("X:" + X);
            console.log("Y:" + Y);


            self.searchService.Textediting_groupObjDocObservable.next({
                DiagramId: self.guid,
                DiagramName: diagramName,
                LocationId: groupId,
                TenantId: self._authenticator.TenantName + "-" + self.inspector.tenantId,
                Name: GroupName,
                X: X,
                Y: Y,
                Type: "Location Group"
            });
            var diagramGUID = self.guid;
            var diagramjson = myDiagram.model.toJson();
            //self.inspector.updateAreaInfoObservable.next({
            //    GUID: diagramGUID,
            //    DiagramJson: diagramjson
            //});

            self.diagramData.diagramJson = diagramjson;
            self.areaService
                .UpdateAreaDiagramJson(self.diagramData, self._authenticator.TenantName)
                .subscribe(res => console.log(res));
        


        });

        myDiagram.addDiagramListener("SelectionUngrouped", function (e: go.DiagramEvent) {
            console.log("=====> SelectionUngrouped");
            console.log("**guid :" + self.guid);
            console.log("**guid length:" + self.guid.length);

            var diagramGUID = self.guid;
            var diagramjson = myDiagram.model.toJson();
            //self.inspector.updateAreaInfoObservable.next({
            //    GUID: diagramGUID,
            //    DiagramJson: diagramjson
            //});

            self.diagramData.diagramJson = diagramjson;
            self.areaService
                .UpdateAreaDiagramJson(self.diagramData, self._authenticator.TenantName)
                .subscribe(res => console.log(res));

        });

        this.inspector._diagram = myDiagram;
        this.inspector.diagramGuid = this.guid;
    }

    TabCreateForArea(GUID, locationName) {
        var self = this;
        this.diagramName = locationName;
        console.log(".inside TabCreateForArea");
        self.addTab1(GUID, locationName);
//        self.DisplayDiagram(GUID);
        self.DisplayDiagram({ "GUID": GUID, "locationName": locationName });

        console.log("GUID : " + GUID);
      

        $('#tabs a.' + GUID).on('click', function () {
            // Get the tab name
            //if (self.areaDiagrams != null || self.areaDiagrams != undefined)
            //    self.areaDiagrams.div = null;

     //       self.DisplayDiagram(GUID);
            self.DisplayDiagram({ "GUID": GUID, "locationName": locationName });


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
            if (self.inspector.diagramGuid == guid) {
                self.inspector._diagram.div = null;

            }
            self.areaService.displayAreaPaletteDiagram$.next(10);
            self.areaService.displayAreaTree$.next(10);
            // if there is no current tab and if there are still tabs left, show the first one
            if ($("#tabs li.current").length == 0 && $("#tabs li").length > 0) {

                // find the first tab
                var firsttab = $("#tabs li:first-child");
                firsttab.addClass("current");

                // get its link name and show related content
                var firsttabid = $(firsttab).find("a.tab").attr("id");
                console.log("firsttabid :" + firsttabid);
                
                
                
                                //self.DisplayDiagram(GUID);
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

    geoFunc(geoname) {
        if (IconsComponent.icons[geoname]) return IconsComponent.icons[geoname];
        else return IconsComponent.icons["screwPump"];
    }

}
