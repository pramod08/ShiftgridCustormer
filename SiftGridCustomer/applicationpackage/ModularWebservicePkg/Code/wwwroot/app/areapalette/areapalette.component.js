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
/// <reference path="../../libs/gojs.d.ts" />
var core_1 = require('@angular/core');
var AspectRatioService_1 = require('../aspectratiocalculation/AspectRatioService');
var areaService_1 = require("../area/areaService");
var AreaPaletteComponent = (function () {
    function AreaPaletteComponent(aspectRatio, areaService) {
        //  areaService.CreateAreasPaletteDiagram$.subscribe(res => this.CreateAreaPalette());
        this.aspectRatio = aspectRatio;
        this.areaService = areaService;
    }
    AreaPaletteComponent.prototype.ngOnInit = function () {
        this.CreateAreaPalette();
    };
    AreaPaletteComponent.prototype.CreateAreaPalette = function () {
        var GO = go.GraphObject.make;
        if (this.areaPalette != undefined || this.areaPalette != null)
            return;
        var areaPalette = GO(go.Palette, "myAreaPaletteDiv");
        this.areaPalette = areaPalette;
        var nodeResizeAdornmentTemplate = GO(go.Adornment, "Spot", { locationSpot: go.Spot.Right }, GO(go.Placeholder), GO(go.Shape, { alignment: go.Spot.TopLeft, cursor: "nw-resize", desiredSize: new go.Size(9, 9), fill: "deepskyblue", stroke: "black" }), GO(go.Shape, { alignment: go.Spot.TopRight, cursor: "ne-resize", desiredSize: new go.Size(9, 9), fill: "deepskyblue", stroke: "black" }), GO(go.Shape, { alignment: go.Spot.BottomLeft, cursor: "se-resize", desiredSize: new go.Size(9, 9), fill: "deepskyblue", stroke: "black" }), GO(go.Shape, { alignment: go.Spot.BottomRight, cursor: "sw-resize", desiredSize: new go.Size(9, 9), fill: "deepskyblue", stroke: "black" }));
        areaPalette.nodeTemplate =
            GO(go.Node, "Auto", { resizable: true, resizeObjectName: "Rectangle", resizeAdornmentTemplate: nodeResizeAdornmentTemplate, selectionAdorned: false }, GO(go.Shape, "Rectangle", { fill: "#ACE600", stroke: null }, new go.Binding("fill", "color"), new go.Binding("height", "height"), new go.Binding("width", "width")), GO(go.TextBlock, {
                margin: 5,
                editable: true,
                font: "bold 9px sans-serif",
                opacity: 0.75,
                stroke: "#404040"
            }, new go.Binding("text", "text").makeTwoWay()));
        //Group tamplate Start
        var self = this;
        areaPalette.groupTemplateMap.add("OfGroups", GO(go.Group, "Auto", {
            resizable: true,
            background: "transparent",
            // highlight when dragging into the Group
            mouseDragEnter: function (e, grp, prev) { self.highlightGroup(e, grp, true); },
            mouseDragLeave: function (e, grp, next) { self.highlightGroup(e, grp, false); },
            computesBoundsAfterDrag: true,
            mouseDrop: self.finishDrop,
            handlesDragDropForMembers: true,
            layout: GO(go.GridLayout, {
                wrappingColumn: 1, alignment: go.GridLayout.Position,
                cellSize: new go.Size(1, 1), spacing: new go.Size(4, 4)
            })
        }, new go.Binding("background", "isHighlighted", function (h) { return h ? "rgba(255,0,0,0.2)" : "transparent"; }).ofObject(), GO(go.Shape, "Rectangle", { fill: null, stroke: "#FFDD33", strokeWidth: 2 }), GO(go.Panel, "Vertical", GO(go.Panel, "Horizontal", { stretch: go.GraphObject.Horizontal, background: "#616161" }, GO("SubGraphExpanderButton", { alignment: go.Spot.Right, margin: 1 }), GO(go.TextBlock, {
            alignment: go.Spot.Left,
            editable: true,
            margin: 3,
            font: "bold 9px sans-serif",
            opacity: 0.75,
            stroke: "#616161"
        }, new go.Binding("text", "text").makeTwoWay())), GO(go.Placeholder, { padding: 5, alignment: go.Spot.TopLeft }))));
        //Group Template End
        areaPalette.model.nodeDataArray = [
            { "key": 1, "text": "CONVENTIONAL GAS", color: "#FF9800", height: 22, width: 118 },
            { "key": 2, "text": "HEAVY OIL", color: "#2E7D32", height: 22, width: 118 },
            { "key": 3, "text": "CONVENTIONAL OIL", color: "#4CAF50", height: 22, width: 118 },
            { "key": 4, "text": "OIL SANDS", color: "#81C784", height: 22, width: 118 },
            { "key": 5, "text": "OFF-SHORE", color: "#4CAF50", height: 22, width: 118 },
            { "key": 6, "text": "GROUP", color: "#616161", height: 22, width: 118, "isGroup": true, category: "OfGroups" }
        ];
    };
    AreaPaletteComponent.prototype.finishDrop = function (e, grp) {
        var ok = (grp !== null
            ? grp.addMembers(grp.diagram.selection, true)
            : e.diagram.commandHandler.addTopLevelParts(e.diagram.selection, true));
        if (!ok)
            e.diagram.currentTool.doCancel();
    };
    AreaPaletteComponent.prototype.highlightGroup = function (e, grp, show) {
        if (!grp)
            return;
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
    };
    AreaPaletteComponent = __decorate([
        core_1.Component({
            selector: 'areapalette',
            templateUrl: 'app/areapalette/area.palette.component.html'
        }), 
        __metadata('design:paramtypes', [AspectRatioService_1.AspectRatioService, areaService_1.AreaService])
    ], AreaPaletteComponent);
    return AreaPaletteComponent;
}());
exports.AreaPaletteComponent = AreaPaletteComponent;
//# sourceMappingURL=areapalette.component.js.map