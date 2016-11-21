/// <reference path="../../libs/gojs.d.ts" />
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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var icons_component_1 = require('./icons.component');
var PaletteComponent = (function () {
    function PaletteComponent(elementRef) {
        this.elementRef = elementRef;
    }
    PaletteComponent.prototype.ngOnInit = function () {
        jQuery(this.elementRef.nativeElement).find('.draggable').draggable({ containment: '#draggable-parent' });
        var GO = go.GraphObject.make;
        //    const paletteDiv1 = this.div1.nativeElement;
        var wellsPalette = GO(go.Palette, "myWellsPaletteDiv");
        wellsPalette.nodeTemplate =
            GO(go.Node, "Vertical", GO(go.Shape, { name: "WSHAPE", width: 40, height: 40, stroke: "black", strokeWidth: 1.5, fill: "black" }, new go.Binding("geometryString", "name", this.geoFunc), new go.Binding("fill", "pColor")), {
                toolTip: GO(go.Adornment, "Auto", GO(go.Shape, { fill: "#f1efee" }), GO(go.TextBlock, { margin: 4 }, new go.Binding("text", "name")))
            });
        wellsPalette.model.nodeDataArray = [
            { name: "gas", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { name: "gasLift", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 },
            { name: "gasInjection", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 },
            { name: "waterSource", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 },
            { name: "waterInjection", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 },
            { name: "oil", type: "well", pColor: 'black', dColor: 'black', color: 'black', width: 30, height: 30 },
            { name: "sagd", type: "well", pColor: 'black', dColor: 'black', color: 'black', width: 50, height: 50 },
            { name: "plungerLift", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 20, height: 65 },
            { name: "pumpJack", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { name: "screwPump", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 }
        ];
        // Major Equipments
        //       const paletteDiv2 = this.div2.nativeElement;
        var majorEquipmentsPalette = GO(go.Palette, "myMEPaletteDiv");
        majorEquipmentsPalette.nodeTemplate = wellsPalette.nodeTemplate;
        majorEquipmentsPalette.model.nodeDataArray = [
            { key: 1, name: "ohexchanger", type: "majorEquipment", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 2, name: "pump", type: "majorEquipment", pColor: '#808080', dColor: 'white', color: 'black', width: 60, height: 60 },
            { key: 3, name: "lineheater", type: "majorEquipment", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 4, name: "compressor", type: "majorEquipment", pColor: '#808080', dColor: 'white', color: 'black', width: 90, height: 75 },
            { key: 5, name: "coalescer", type: "majorEquipment", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 6, name: "exchanger", type: "majorEquipment", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 }
        ];
        // Meters
        //     const paletteDiv3 = this.div3.nativeElement;
        var metersPalette = GO(go.Palette, "myMeterPaletteDiv");
        metersPalette.nodeTemplate = wellsPalette.nodeTemplate;
        metersPalette.model.nodeDataArray = [
            { key: 1, name: "thermalmass", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 2, name: "turbine", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 3, name: "orifice", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 30, height: 40 },
            { key: 4, name: "rotameter", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 5, name: "vortex", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 6, name: "ultrasonic", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 7, name: "vcone", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 8, name: "flowNozzle", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 9, name: "mag", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 10, name: "coriolis", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 11, name: "pd", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 12, name: "localMounted", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 13, name: "netoil", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 14, name: "optical", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            { key: 15, name: "samplePoint", type: "meter", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 }
        ];
        // Tanks and Vessel
        //    const paletteDiv4 = this.div4.nativeElement;
        var tanksPalette = GO(go.Palette, "myTVPaletteDiv");
        tanksPalette.nodeTemplate = wellsPalette.nodeTemplate;
        tanksPalette.model.nodeDataArray = [
            { key: 1, name: "vesselUnderground", type: "tank", pColor: '#808080', dColor: 'white', color: 'black', width: 85, height: 55 },
            { key: 2, name: "tankUnderground", type: "tank", pColor: '#808080', dColor: 'white', color: 'black', width: 85, height: 55 },
            { key: 3, name: "pond", type: "tank", pColor: 'black', dColor: 'black', color: 'black', width: 80, height: 40 },
            { key: 4, name: "tank", type: "tank", pColor: '#808080', dColor: 'white', color: 'black', width: 85, height: 65 },
            { key: 5, name: "separator", type: "tank", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 100 },
            { key: 6, name: "vesselwboot", type: "tank", pColor: '#808080', dColor: 'white', color: 'black', width: 75, height: 55 },
            { key: 7, name: "fuelScrubber", type: "tank", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 }
        ];
        // Minor Equipment
        //   const paletteDiv5 = this.div5.nativeElement;
        var minorEquipmentsPalette = GO(go.Palette, "myMIEPaletteDiv");
        minorEquipmentsPalette.nodeTemplate = wellsPalette.nodeTemplate;
        minorEquipmentsPalette.model.nodeDataArray = [
            { key: 1, name: "heaterother", type: "minorEquipment", pColor: '#808080', dColor: 'white', color: 'black', width: 25, height: 60 },
            { key: 2, name: "tanker", type: "minorEquipment", pColor: '#808080', dColor: 'white', color: 'black', width: 105, height: 70 },
            { key: 3, name: "testconnection", type: "minorEquipment", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 },
            { key: 4, name: "fuelgas", type: "minorEquipment", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 },
            { key: 5, name: "valve", type: "minorEquipment", pColor: '#808080', dColor: 'white', color: 'black', width: 30, height: 30 },
            { key: 6, name: "flarestack", type: "minorEquipment", pColor: '#808080', dColor: 'white', color: 'black', width: 30, height: 60 },
            { key: 8, name: "pressurecontrolvalve", type: "minorEquipment", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 }
        ];
        // Link Connector
        //     const paletteDiv6 = this.div6.nativeElement;
        var linkConnectorsPalette = GO(go.Palette, "myLCPaletteDiv");
        linkConnectorsPalette.nodeTemplate = wellsPalette.nodeTemplate;
        linkConnectorsPalette.model.nodeDataArray = [
            { key: 1, name: "lconnector2", type: "Connector", pColor: 'black', dColor: 'black', color: 'black', width: 16, height: 20 },
            { key: 2, name: "tconnector1", type: "Connector", pColor: 'black', dColor: 'black', color: 'black', width: 20, height: 15 },
            { key: 3, name: "lconnector3", type: "Connector", pColor: 'black', dColor: 'black', color: 'black', width: 16, height: 20 },
            { key: 4, name: "tconnector4", type: "Connector", pColor: 'black', dColor: 'black', color: 'black', width: 15, height: 20 },
            { key: 5, name: "xconnector", type: "Connector", pColor: 'black', dColor: 'black', color: 'black', width: 20, height: 20 },
            { key: 6, name: "tconnector2", type: "Connector", pColor: 'black', dColor: 'black', color: 'black', width: 16, height: 20 },
            { key: 7, name: "lconnector1", type: "Connector", pColor: 'black', dColor: 'black', color: 'black', width: 16, height: 20 },
            { key: 8, name: "tconnector3", type: "Connector", pColor: 'black', dColor: 'black', color: 'black', width: 20, height: 15 },
            { key: 9, name: "lconnector4", type: "Connector", pColor: 'black', dColor: 'black', color: 'black', width: 16, height: 20 }
        ];
        // Shapes
        //      const paletteDiv7 = this.div7.nativeElement;
        var shapesPalette = GO(go.Palette, "mySPaletteDiv");
        shapesPalette.nodeTemplate = wellsPalette.nodeTemplate;
        shapesPalette.model.nodeDataArray = [
            { key: 1, name: "circle", type: "shape", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 },
            { key: 2, name: "rectangle", type: "shape", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 },
            { key: 3, name: "rectangletriangle", type: "shape", pColor: '#808080', dColor: 'white', color: 'black', width: 55, height: 35 },
            { key: 4, name: "triangle", type: "shape", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 }
        ];
        this.accordin();
    };
    PaletteComponent.prototype.geoFunc = function (geoname) {
        if (icons_component_1.IconsComponent.icons[geoname])
            return icons_component_1.IconsComponent.icons[geoname];
        else
            return icons_component_1.IconsComponent.icons["Screw Pump"];
    };
    PaletteComponent.prototype.accordin = function () {
        var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
            acc[i].nextElementSibling.classList.toggle("hide");
            acc[i].onclick = function () {
                this.classList.toggle("active");
                this.nextElementSibling.classList.toggle("hide");
            };
        }
    };
    __decorate([
        core_1.ViewChild("myWellsPaletteDiv"), 
        __metadata('design:type', Object)
    ], PaletteComponent.prototype, "div1", void 0);
    __decorate([
        core_1.ViewChild("myMEPaletteDiv"), 
        __metadata('design:type', Object)
    ], PaletteComponent.prototype, "div2", void 0);
    __decorate([
        core_1.ViewChild("myMeterPaletteDiv"), 
        __metadata('design:type', Object)
    ], PaletteComponent.prototype, "div3", void 0);
    __decorate([
        core_1.ViewChild("myTVPaletteDiv"), 
        __metadata('design:type', Object)
    ], PaletteComponent.prototype, "div4", void 0);
    __decorate([
        core_1.ViewChild("myMIEPaletteDiv"), 
        __metadata('design:type', Object)
    ], PaletteComponent.prototype, "div5", void 0);
    __decorate([
        core_1.ViewChild("myLCPaletteDiv"), 
        __metadata('design:type', Object)
    ], PaletteComponent.prototype, "div6", void 0);
    __decorate([
        core_1.ViewChild("mySPaletteDiv"), 
        __metadata('design:type', Object)
    ], PaletteComponent.prototype, "div7", void 0);
    PaletteComponent = __decorate([
        core_1.Component({
            selector: 'palette',
            templateUrl: 'app/palette/palette.template.html',
            styleUrls: ['app/palette/palette.styles.css', 'app/palette/palettescroll.css']
        }),
        __param(0, core_1.Inject(core_1.ElementRef)), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PaletteComponent);
    return PaletteComponent;
}());
exports.PaletteComponent = PaletteComponent;
//# sourceMappingURL=palette.component.js.map