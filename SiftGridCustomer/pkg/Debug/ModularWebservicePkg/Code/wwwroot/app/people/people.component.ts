﻿/// <reference path="../area/areaservice.ts" />

import {Component, ViewChild, HostListener, Input, Output, EventEmitter} from '@angular/core';
import {PeopleService} from './peopleService';
import {Http, Response} from '@angular/http';
import { AreaService} from "../area/areaService";
import { SearchService} from "../search/searchService";
import {Guid} from "../area/guid"
import { Observable }     from 'rxjs/Observable';
import {AspectRatioService} from '../aspectratiocalculation/AspectRatioService'
import {Authenticator} from '../auth/Authenticator';
import {DiagramService} from '../diagram/diagramService'

declare var $: any;

@Component({
    selector: 'people',
    templateUrl: 'app/people/people.template.html'
})

export class PeopleComponent {

     tenantId;
    constructor(public http: Http, public peopleService: PeopleService,
    private searchService: SearchService, public areaService: AreaService,
    public aspectRatio: AspectRatioService, private _authenticator: Authenticator
        , public diagramService: DiagramService) {

        peopleService.CreatePeopleDiagram$.subscribe(res => this.CreatePeopleDiagram());

        areaService.GetTenantId(this._authenticator.TenantName)
            .subscribe(res => {
                console.log(res);
                this.tenantId = res;
                console.log(this.tenantId);

            })

        searchService.createpeopleDiagramWithLocation$
            .subscribe(res => {
                areaService.displayPeopleDiagram$.next(10);
                areaService.displayPeopleDiagramTree$.next(10);
                var guid = res[0]["DiagramId"];
                var Name = res[0]["DiagramName"];
                var locationId = res[0]["LocationId"];
                //this.TabCreateForArea(guid, Name);
                this.CreatePeopleDiagram();
                Observable.of(10).delay(2000).subscribe(res => {
                    var groupNode = this.peopleDiagram.findNodeForKey(locationId);

                    //    this.peopleDiagram.position = groupNode.part.actualBounds.position

                    this.peopleDiagram.centerRect(groupNode.part.actualBounds)
                });
            }, err => console.log(err),
            () => console.log("Created diagram obserable completed"));
    }
    json: Object;


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
        let currentComponentWidth = this.aspectRatio.ComponentWidth(currentWidthRatio, (this.json["PeopleTree"])["width"]);
        let currentComponentHeight = this.aspectRatio.ComponentHeight(currentComponentWidth, (this.json["PeopleTree"])["height"] / (this.json["PeopleTree"])["width"]);
        let currentComponentLeft = this.aspectRatio.ComponentLeft(currentWidthRatio, (this.json["PeopleTree"])["left"]);
        let currentComponentTop = this.aspectRatio.ComponentTop(currentComponentLeft, (this.json["PeopleTree"])["top"] / (this.json["PeopleTree"])["left"]);

        /**
         * this is used to create dynamic CSS
         */
        $.injectCSS({
            "#PeopleTree": {
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

    peopleDiagram: go.Diagram;
    peopleTreeDiagram: go.Diagram;



    JsonData;
    Guid: string =  "biz-123";

   

    getPeopleDiagramJson(val) {
        //this.Guid = val;
        console.log(val)
        //this.peopleService
        //    .getUserById(val)
        //    .subscribe(data => {
        //        console.log(data);
        //        this.JsonData = data["jsonData"];
        //    });

        this.CreatePeopleDiagram();
    }


    CreatePeopleDiagram() {
        var self = this;
        var GO = go.GraphObject.make;  // for conciseness in defining templates

        //       this.TerminateObjectReferencesFromDiv();

        if (this.peopleDiagram != undefined)
            return;


        var myDiagram: go.Diagram =
            GO(go.Diagram, "peopleDiagram", // must be the ID or reference to div
                {
                    allowDrop: true, // from Palette
                    mouseDrop: function (e) { finishDrop(e, null); },
                    allowMove: true,
                    allowCopy: true,
                    allowDelete: true,
                    allowHorizontalScroll: true,

                    initialContentAlignment: go.Spot.Center,
                    maxSelectionCount: 1, // users can select only one part at a time
                    validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
                    "clickCreatingTool.archetypeNodeData": {}, // allow double-click in background to create a new node
                    "clickCreatingTool.insertPart": function (loc) {  // customize the data for the new node
                        this.archetypeNodeData = {
                            key: Guid.generateGuid(), // assign the key based on the number of nodes
                            name: "(new person)",
                            title: "(title)"
                        };
                        var selnode = myDiagram.selection.first();
                        var locationName = this.archetypeNodeData['name'];
                        console.log("Person Name : " + locationName);
                        var locationId = this.archetypeNodeData['key']
                        console.log("Person ID : " + locationId);
                        var title = this.archetypeNodeData['title']
                        console.log("Title Name : " + title);
                        var tenantId = self.tenantId
                        self.searchService.InsertPeopleDocObservable.next({
                            DiagramId: self.Guid,
                            DiagramName: "People",
                            LocationId: locationId,
                            TenantId: self._authenticator.TenantName + "-" + tenantId,
                            Name: locationName,
                            X: "",
                            Y: "",
                            Type: "People"
                        });

                        self.searchService.InsertPeoplewithTitleDocObservable.next({
                            DiagramId: self.Guid,
                            DiagramName: "People",
                            LocationId: locationId,
                            TenantId: self._authenticator.TenantName + "-" + tenantId,
                            Name: title,
                            X: "",
                            Y: "",
                            Type: "People"
                        });


                        return go.ClickCreatingTool.prototype.insertPart.call(this, loc);
                    },
                    layout:
                    GO(go.TreeLayout,
                        {
                            treeStyle: go.TreeLayout.StyleLastParents,
                            arrangement: go.TreeLayout.ArrangementHorizontal,
                            // properties for most of the tree:
                            angle: 90,
                            layerSpacing: 35,
                            // properties for the "last parents":
                            alternateAngle: 90,
                            alternateLayerSpacing: 35,
                            alternateAlignment: go.TreeLayout.AlignmentBus,
                            alternateNodeSpacing: 20
                        }),
                    "undoManager.isEnabled": true,
                    "ChangedSelection": function (e) {
                        if (myChangingSelection) return;
                        myChangingSelection = true;
                        var diagnodes = new go.Set();
                        myDiagram.selection.each(function (n) {
                            diagnodes.add(myTree.findNodeForData(n.data));
                        });
                        myTree.clearSelection();
                        myTree.selectCollection(diagnodes);
                        myChangingSelection = false;
                    }
                });

        this.peopleDiagram = myDiagram;

        // Getting tenant Id

        function finishDrop(e, grp) {
            var ok = (grp !== null
                ? grp.addMembers(grp.diagram.selection, true)
                : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
            if (!ok) e.diagram.currentTool.doCancel();
        }

        var myChangingSelection = false;



        myDiagram.addDiagramListener("TextEdited", function (e: go.DiagramEvent) {
            var diagramGUID = self.Guid;
            var diagramjson = myDiagram.model.toJson();
            var tenantName = self._authenticator.TenantName
            if (myDiagram.isModified) {
                self.peopleService.updateUserObservable.next({
                    Guid: diagramGUID,
                    jsonData: diagramjson,
                    tenantName: tenantName,
                    tenantId: tenantId
                });

                var selnode = myDiagram.selection.first();
                var locationId = selnode.data.key;
                var name = e.diagram.selection.first().data["name"];
                var locationName = selnode.data.name;

                console.log("person Name  " + name);
                console.log("Edit Person Name : " + locationName);
                console.log(" Edit Person ID : " + locationId);
                var title = selnode.data.title;
                console.log("Title Name : " + title);
                self.searchService.EditPeopleDocObservable.next({
                    DiagramId: self.Guid,
                    DiagramName: "People",
                    LocationId: locationId,
                    TenantId: self._authenticator.TenantName + "-" + tenantId,
                    Name: locationName,
                    X: "",
                    Y: "",
                    Type: "People"
                });
                self.searchService.EditPeoplewithTitleDocObservable.next({
                    DiagramId: self.Guid,
                    DiagramName: "People",
                    LocationId: locationId,
                    TenantId: self._authenticator.TenantName + "-" + tenantId,
                    Name: title,
                    X: "",
                    Y: "",
                    Type: "People"
                });

            }

        });

        myDiagram.addDiagramListener("SelectionDeleting", function (e) {
            var part = e.subject.first(); // e.subject is the myDiagram.selection collection,
            // so we'll get the first since we know we only have one selection
            var selnode = myDiagram.selection.first();
            var locationId = selnode.data.key;

            myDiagram.startTransaction("clear boss");
            if (part instanceof go.Node) {
                var it = part.findTreeChildrenNodes(); // find all child nodes
                while (it.next()) { // now iterate through them and clear out the boss information
                    var child = it.value;
                    var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
                    if (bossText === null) return;
                    bossText.text = undefined;
                }
            } else if (part instanceof go.Link) {
                var child = part.toNode;
                var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
                if (bossText === null) return;
                bossText.text = undefined;
            }
            myDiagram.commitTransaction("clear boss");

            console.log(" deleteing person ID " + locationId);
            self.searchService.deletePeopleDocObservable.next(locationId);
        });

        var levelColors = ["#AC193D/#BF1E4B", "#2672EC/#2E8DEF", "#8C0095/#A700AE", "#5133AB/#643EBF",
            "#008299/#00A0B1", "#D24726/#DC572E", "#008A00/#00A600", "#094AB2/#0A5BC4"];

        // override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
        (<go.TreeLayout>myDiagram.layout).commitNodes = function () {
            go.TreeLayout.prototype.commitNodes.call(myDiagram.layout);  // do the standard behavior
            // then go through all of the vertexes and set their corresponding node's Shape.fill
            // to a brush dependent on the TreeVertex.level value
            myDiagram.layout.network.vertexes.each(function (v: any) {
                if (v.node) {
                    var level = v.level % (levelColors.length);
                    var colors = levelColors[level].split("/");
                    var shape = v.node.findObject("SHAPE");
                    if (shape) shape.fill = GO(go.Brush, "Linear", { 0: colors[0], 1: colors[1], start: go.Spot.Left, end: go.Spot.Right });
                }
            });
        };

        myDiagram.addModelChangedListener(function (e) {
            // myTree.startTransaction("add Tree");
            if (e.model.skipsUndoManager) return;
            // don't need to start/commit a transaction because the UndoManager is shared with myTreeView
            if (e.modelChange === "nodeGroupKey" || e.modelChange === "nodeParentKey") {
                // handle structural change: group memberships
                var treenode = myTree.findNodeForData(e.object);
                if (treenode !== null) treenode.updateRelationshipsFromData();
            } else if (e.change === go.ChangedEvent.Property) {
                var treenode = myTree.findNodeForData(e.object);
                if (treenode !== null) treenode.updateTargetBindings();
            } else if (e.change === go.ChangedEvent.Insert && e.propertyName === "nodeDataArray") {
                // pretend the new data isn't already in the nodeDataArray for myTreeView
                myTree.model.nodeDataArray.splice(e.newParam, 1);
                // now add to the myTreeView model using the normal mechanisms
                myTree.model.addNodeData(e.newValue);
            } else if (e.change === go.ChangedEvent.Remove && e.propertyName === "nodeDataArray") {
                // remove the corresponding node from myTreeView
                var treenode = myTree.findNodeForData(e.oldValue);
                if (treenode !== null) myTree.remove(treenode);
            }
            // myTree.commitTransaction("add Tree");

        });

        // This function is used to find a suitable ID when modifying/creating nodes.
        // We used the counter combined with findNodeDataForKey to ensure uniqueness.
        var nodeIdCounter = -1;

        function getNextKey() {
            console.log("getNextKey");

            var key = nodeIdCounter;
            while (myDiagram.model.findNodeDataForKey(key.toString()) !== null) {
                key = nodeIdCounter -= 1;
            }
            return key.toString();
        }
        var tenantId = this.tenantId
        console.log(tenantId)
        // when a node is double-clicked, add a child to it
        function nodeDoubleClick(e, obj) {
            var clicked = obj.part;
            if (clicked !== null) {
                var thisemp = clicked.data;
                myDiagram.model.startTransaction("add employee");
                var nextkey = Guid.generateGuid();
                var newemp = { key: nextkey, name: "(new person)", title: "(title)", parent: thisemp.key };
                console.log(newemp);
                //console.log("==> 1st data :"+myDiagram.model.nodeDataArray[0].key);
                myDiagram.model.addNodeData(newemp);
                //myDiagram.model.addLinkData({ from: 11, to: 12 });
                console.log("===>" + myDiagram.model.toJson());
                myDiagram.model.commitTransaction("add employee");

                var selnode = newemp
                var locationName = selnode['name'];
                console.log("Person Name : " + locationName);
                var locationId = selnode['key']
                console.log("Person ID : " + locationId);
                self.searchService.InsertPeopleDocObservable.next({
                    DiagramId: self.Guid,
                    DiagramName: "People",
                    LocationId: locationId,
                    TenantId: self._authenticator.TenantName + "-" + tenantId,
                    Name: locationName,
                    X: "",
                    Y: "",
                    Type: "People"
                });


                var title = selnode['title']

                self.searchService.InsertPeoplewithTitleDocObservable.next({
                    DiagramId: self.Guid,
                    DiagramName: "People",
                    LocationId: locationId,
                    TenantId: self._authenticator.TenantName + "-" + tenantId,
                    Name: title,
                    X: "",
                    Y: "",
                    Type: "People"
                });

            }
        }

        myDiagram.addDiagramListener("BackgroundSingleClicked", function (e) {
            console.log("Background click :" + myDiagram.model.toJson());
            var diagramGUID = self.Guid;
            var diagramjson = myDiagram.model.toJson();
            var tenantName = self._authenticator.TenantName
            console.log(myDiagram.model.toJson());
            self.peopleService.updateUserObservable.next({
                Guid: diagramGUID,
                jsonData: diagramjson,
                    tenantName: tenantName,
                tenantId: tenantId
            });
        });


        function mayWorkFor(node1, node2) {
            if (!(node1 instanceof go.Node)) return false;  // must be a Node
            if (node1 === node2) return false;  // cannot work for yourself
            if (node2.isInTreeOf(node1)) return false;  // cannot work for someone who works for you
            return true;
        }
        function textStyle() {
            return { font: "9pt  Segoe UI,sans-serif", stroke: "white" };
        }

        // This converter is used by the Picture.
        function findHeadShot(key) {
            if (key < 0 || key > 16) return "images/HS0.png"; // There are only 16 images on the server
            return "images/HS" + key + ".png"
        }

        // define the Node template
        myDiagram.nodeTemplate =
            GO(go.Node, "Auto",
                { doubleClick: nodeDoubleClick },
                { // handle dragging a Node onto a Node to (maybe) change the reporting relationship
                    mouseDragEnter: function (e, node, prev) {
                        var diagram = node.diagram;
                        var selnode = diagram.selection.first();
                        if (!mayWorkFor(selnode, node)) return;
                        var shape = node.findObject("SHAPE");
                        if (shape) {
                            shape._prevFill = shape.fill;  // remember the original brush
                            shape.fill = "darkred";
                        }
                    },
                    mouseDragLeave: function (e, node, next) {
                        var shape = node.findObject("SHAPE");
                        if (shape && shape._prevFill) {
                            shape.fill = shape._prevFill;  // restore the original brush
                        }
                    },
                    mouseDrop: function (e, node) {
                        var diagram = node.diagram;
                        var selnode = diagram.selection.first();  // assume just one Node in selection
                        if (mayWorkFor(selnode, node)) {
                            // find any existing link into the selected node
                            var link = selnode.findTreeParentLink();
                            if (link !== null) {  // reconnect any existing link
                                link.fromNode = node;
                            } else {  // else create a new link
                                diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
                            }
                        }
                    }
                },
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                // for sorting, have the Node.text be the data.name
                new go.Binding("text", "name"),
                // bind the Part.layerName to control the Node's layer depending on whether it isSelected
                new go.Binding("layerName", "isSelected", function (sel) { return sel ? "Foreground" : ""; }).ofObject(),
                // define the node's outer shape
                GO(go.Shape, "Rectangle",
                    {
                        name: "SHAPE", fill: "#696969", stroke: null,
                        // set the port properties:
                        portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
                    }),
                GO(go.Panel, "Horizontal",
                    GO(go.Picture,
                        {
                            name: 'Picture',
                            desiredSize: new go.Size(29, 30),
                            margin: new go.Margin(4, 6, 4, 8),
                        }
                    //    new go.Binding("source", "key", findHeadShot)
                    ),
                    // define the panel where the text will appear
                    GO(go.Panel, "Table",
                        {
                            maxSize: new go.Size(150, 999),
                            margin: new go.Margin(6, 10, 0, 3),
                            defaultAlignment: go.Spot.Left
                        },
                        GO(go.RowColumnDefinition, { column: 2, width: 4 }),
                        GO(go.TextBlock, textStyle(),  // the name
                            {
                                row: 0, column: 0, columnSpan: 5,
                                font: "12pt Segoe UI,sans-serif",
                                editable: true, isMultiline: false,
                                minSize: new go.Size(10, 16)
                            },
                            new go.Binding("text", "name").makeTwoWay()),
                        GO(go.TextBlock, "Title: ", textStyle(),
                            { row: 1, column: 0 }),
                        GO(go.TextBlock, textStyle(),
                            {
                                row: 1, column: 1, columnSpan: 4,
                                editable: true, isMultiline: false,
                                minSize: new go.Size(8, 12),
                                margin: new go.Margin(0, 0, 0, 3)
                            },
                            new go.Binding("text", "title").makeTwoWay()),
                        GO(go.TextBlock, textStyle(),
                            { row: 2, column: 0 },
                            new go.Binding("text", "key", function (v) { return "ID: " + v; })),
                        GO(go.TextBlock, textStyle(),
                            { name: "boss", row: 2, column: 3, }, // we include a name so we can access this TextBlock when deleting Nodes/Links
                            new go.Binding("text", "parent", function (v) { return "Boss: " + v; })),
                        GO(go.TextBlock, textStyle(),  // the comments
                            {
                                row: 3, column: 0, columnSpan: 5,
                                font: "italic 9pt sans-serif",
                                wrap: go.TextBlock.WrapFit,
                                editable: true,  // by default newlines are allowed
                                minSize: new go.Size(8, 12)
                            },
                            new go.Binding("text", "comments").makeTwoWay())
                    )  // end Table Panel
                ) // end Horizontal Panel
            );  // end Node



        // define the Link template
        myDiagram.linkTemplate =
            GO(go.Link, go.Link.Orthogonal,
                { corner: 5, relinkableFrom: true, relinkableTo: true },
                GO(go.Shape, { strokeWidth: 4, stroke: "#00a4a4" }));


        //TREE VIEW
        var myTree = GO(go.Diagram, "PeopleTree",
            {
                allowMove: true,
                allowCopy: true,
                allowDelete: true,
                allowDrop: true, // from Palette
                // what to do when a drag-drop occurs in the Diagram's background
                mouseDrop: function (e) { finishDrop(e, null); },
                allowHorizontalScroll: false,
                "commandHandler.copiesTree": true,
                "commandHandler.copiesParentKey": true,
                maxSelectionCount: 1, // users can select only one part at a time
                validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
                //  "clickCreatingTool.archetypeNodeData": {},
                layout: GO(go.TreeLayout,
                    {
                        alignment: go.TreeLayout.AlignmentStart,
                        angle: 0,
                        compaction: go.TreeLayout.CompactionNone,
                        layerSpacing: 16,
                        layerSpacingParentOverlap: 1,
                        nodeIndent: 2,
                        nodeIndentPastParent: 0.88,
                        nodeSpacing: 0,
                        setsPortSpot: true,
                        setsChildPortSpot: true,
                        arrangementSpacing: new go.Size(0, 0)
                    }), "undoManager.isEnabled": true,
                "ChangedSelection": function (e) {
                    if (myChangingSelection) return;
                    myChangingSelection = true;
                    var diagnodes = new go.Set<go.Node>();
                    myTree.selection.each(function (n) {
                        diagnodes.add(myDiagram.findNodeForData(n.data));
                    });
                    myDiagram.clearSelection();
                    myDiagram.selectCollection(diagnodes);
                    myChangingSelection = false;
                }
            });
        this.peopleTreeDiagram = myTree;

        var myChangingSelection = false;
        myTree.model = GO(go.TreeModel, { nodeParentKeyProperty: "parent" });

        myTree.addModelChangedListener(function (e) {
            // myTree.startTransaction("add Tree");
            if (e.model.skipsUndoManager) return;
            // don't need to start/commit a transaction because the UndoManager is shared with myTreeView
            if (e.modelChange === "nodeGroupKey" || e.modelChange === "nodeParentKey") {
                // handle structural change: group memberships
                var treenode = myDiagram.findNodeForData(e.object);
                if (treenode !== null) treenode.updateRelationshipsFromData();
            } else if (e.change === go.ChangedEvent.Property) {
                var treenode = myDiagram.findNodeForData(e.object);
                if (treenode !== null) treenode.updateTargetBindings();
                //     } else if (e.change === go.ChangedEvent.Insert && e.propertyName === "nodeDataArray") {
                // pretend the new data isn't already in the nodeDataArray for myTreeView
                //         myDiagram.model.nodeDataArray.splice(e.newParam, 1);
                // now add to the myTreeView model using the normal mechanisms
                //          myDiagram.model.addNodeData(e.newValue);
            } else if (e.change === go.ChangedEvent.Remove && e.propertyName === "nodeDataArray") {
                // remove the corresponding node from myTreeView
                var treenode = myDiagram.findNodeForData(e.oldValue);
                if (treenode !== null) myDiagram.remove(treenode);
            }
            // myTree.commitTransaction("add Tree");

        });

        myTree.addDiagramListener("TextEdited", function (e: go.DiagramEvent) {
            var diagramGUID = self.Guid;
            var diagramjson = myTree.model.toJson();
            console.log(myTree.model.toJson());
            var tenantName = self._authenticator.TenantName
            if (myTree.isModified) {
                self.peopleService.updateUserObservable.next({
                    Guid: diagramGUID,
                    jsonData: diagramjson,

                    tenantName: tenantName,
                    tenantId: tenantId
                });
            }
        });

        myTree.addDiagramListener("PartCreated", function (e: go.Diagram) {
            console.log(e.selection.first().data);

        });

        myTree.addDiagramListener("SelectionDeleting", function (e) {
            var part = e.subject.first(); // e.subject is the myDiagram.selection collection,
            // so we'll get the first since we know we only have one selection
            myTree.startTransaction("clear boss");
            if (part instanceof go.Node) {
                var it = part.findTreeChildrenNodes(); // find all child nodes
                while (it.next()) { // now iterate through them and clear out the boss information
                    var child = it.value;
                    var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
                    if (bossText === null) return;
                    bossText.text = undefined;
                }
            } else if (part instanceof go.Link) {
                var child = part.toNode;
                var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
                if (bossText === null) return;
                bossText.text = undefined;
            }
            myTree.commitTransaction("clear boss");
        });


        myTree.nodeTemplate =
            GO(go.Node,
                { // no Adornment: instead change panel background color by binding to Node.isSelected
                    selectionAdorned: true,
                    // a custom function to allow expanding/collapsing on double-click
                    // this uses similar logic to a TreeExpanderButton
                    doubleClick: function (e, node) {
                        var cmd = myTree.commandHandler;
                        if (node.isTreeExpanded) {
                            if (!cmd.canCollapseTree(node)) return;
                        } else {
                            if (!cmd.canExpandTree(node)) return;
                        }
                        e.handled = true;
                        if (node.isTreeExpanded) {
                            cmd.collapseTree(node);
                        } else {
                            cmd.expandTree(node);
                        }
                    }, mouseDragEnter: function (e, node, prev) {
                        var diagram = node.diagram;
                        var selnode = diagram.selection.first();
                        if (!mayWorkFor(selnode, node)) return;
                        var shape = node.findObject("SHAPE");
                        if (shape) {
                            shape._prevFill = shape.fill;  // remember the original brush
                            shape.fill = "darkred";
                        }
                    },
                    mouseDragLeave: function (e, node, next) {
                        var shape = node.findObject("SHAPE");
                        if (shape && shape._prevFill) {
                            shape.fill = shape._prevFill;  // restore the original brush
                        }
                    },
                    mouseDrop: function (e, node) {
                        var diagram = node.diagram;
                        var selnode = diagram.selection.first();  // assume just one Node in selection
                        if (mayWorkFor(selnode, node)) {
                            // find any existing link into the selected node
                            var link = selnode.findTreeParentLink();
                            if (link !== null) {  // reconnect any existing link
                                link.fromNode = node;
                            } else {  // else create a new link
                                diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
                            }
                        }
                    }
                },
                GO("TreeExpanderButton",
                    {
                        width: 14,
                        "ButtonBorder.fill": "whitesmoke",
                        "ButtonBorder.stroke": null,
                        "_buttonFillOver": "rgba(255,255,0,0.8)",
                        "_buttonStrokeOver": null
                    }),

                GO(go.Panel, "Horizontal",
                    { position: new go.Point(16, 0) },
                    new go.Binding("background", "isSelected", function (s) { return (s ? "#696969" : "#696969"); }).ofObject(),
                    GO(go.Picture,
                        {
                            width: 0, height: 18,
                            margin: new go.Margin(0, 4, 0, 0),
                            imageStretch: go.GraphObject.Uniform
                        }),
                    // bind the picture source on two properties of the Node
                    // to display open folder, closed folder, or document

                    GO(go.TextBlock,
                        {
                            font: '9pt Verdana, sans-serif',
                            stroke: "white",
                            wrap: go.TextBlock.WrapFit,
                            editable: true,
                        },
                        new go.Binding("text", "name").makeTwoWay()))
            );  // end Node

        // without lines
        myTree.linkTemplate = GO(go.Link);

        this.GetPeopleJson();

        // share all of the data with the tree view
        myTree.model.nodeDataArray = myDiagram.model.nodeDataArray;

        // share the UndoManager too!
        myTree.model.undoManager = myDiagram.model.undoManager;

    }

    GetPeopleJson() {
        var JsonData;
        var self = this;
        this.peopleService
            .getUserById(this.Guid, this._authenticator.TenantName)
            .subscribe(data => {
                console.log(data);
                JsonData = data["jsonData"];
           //     this.tenantId = data["tenantId"]
                self.peopleDiagram.model = go.Model.fromJson(JsonData);
                self.peopleTreeDiagram.model.nodeDataArray = self.peopleDiagram.model.nodeDataArray;
            });
        this.JsonData = JsonData;
        return JsonData;
    }
}