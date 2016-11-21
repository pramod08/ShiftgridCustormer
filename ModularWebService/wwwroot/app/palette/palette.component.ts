/// <reference path="../../libs/gojs.d.ts" />

import {Component, AfterViewInit, OnInit, ViewChild, ElementRef, Inject} from '@angular/core';
import {IconsComponent} from './icons.component';
declare var jQuery: any;

@Component({
    selector: 'palette',
    templateUrl: 'app/palette/palette.template.html',
    styleUrls: ['app/palette/palette.styles.css', 'app/palette/palettescroll.css']
})

export class PaletteComponent implements OnInit {

    @ViewChild("myWellsPaletteDiv") div1;
    @ViewChild("myMEPaletteDiv") div2;
    @ViewChild("myMeterPaletteDiv") div3;
    @ViewChild("myTVPaletteDiv") div4;
    @ViewChild("myMIEPaletteDiv") div5;
    @ViewChild("myLCPaletteDiv") div6;
    @ViewChild("mySPaletteDiv") div7;


    elementRef: ElementRef;

    constructor( @Inject(ElementRef) elementRef: ElementRef) {
        this.elementRef = elementRef;
    }



    ngOnInit() {

        jQuery(this.elementRef.nativeElement).find('.draggable').draggable({ containment: '#draggable-parent' });

        const GO = go.GraphObject.make;

        //    const paletteDiv1 = this.div1.nativeElement;
        var wellsPalette = GO(go.Palette, "myWellsPaletteDiv");
        wellsPalette.nodeTemplate =
            GO(go.Node, "Vertical",
                GO(go.Shape, { name: "WSHAPE", width: 40, height: 40, stroke: "black", strokeWidth: 1.5, fill: "black" },
                    new go.Binding("geometryString", "name", this.geoFunc),
                    new go.Binding("fill", "pColor"))
                , {
                    toolTip:
                    GO(go.Adornment, "Auto",
                        GO(go.Shape, { fill: "#f1efee" }),
                        GO(go.TextBlock, { margin: 4 },
                            new go.Binding("text", "name"))
                    )
                });

        wellsPalette.model.nodeDataArray = [
            {  name: "gas", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            {  name: "gasLift", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 },
            {  name: "gasInjection", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 },
            { name: "waterSource", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 },
            {  name: "waterInjection", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 },
            {name: "oil", type: "well", pColor: 'black', dColor: 'black', color: 'black', width: 30, height: 30 },
            {  name: "sagd", type: "well", pColor: 'black', dColor: 'black', color: 'black', width: 50, height: 50 },
            {  name: "plungerLift", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 20, height: 65 },
            { name: "pumpJack", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 },
            {  name: "screwPump", type: "well", pColor: '#808080', dColor: 'white', color: 'black', width: 50, height: 50 }
        ];

        // Major Equipments
        //       const paletteDiv2 = this.div2.nativeElement;
        var majorEquipmentsPalette = GO(go.Palette, "myMEPaletteDiv");
        majorEquipmentsPalette.nodeTemplate = wellsPalette.nodeTemplate

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
        metersPalette.nodeTemplate = wellsPalette.nodeTemplate



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
        tanksPalette.nodeTemplate = wellsPalette.nodeTemplate


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
        minorEquipmentsPalette.nodeTemplate = wellsPalette.nodeTemplate


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
        linkConnectorsPalette.nodeTemplate = wellsPalette.nodeTemplate



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
        shapesPalette.nodeTemplate = wellsPalette.nodeTemplate


        shapesPalette.model.nodeDataArray = [
            { key: 1, name: "circle", type: "shape", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 },
            { key: 2, name: "rectangle", type: "shape", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 },
            { key: 3, name: "rectangletriangle", type: "shape", pColor: '#808080', dColor: 'white', color: 'black', width: 55, height: 35 },
            { key: 4, name: "triangle", type: "shape", pColor: '#808080', dColor: 'white', color: 'black', width: 40, height: 40 }
        ];

        this.accordin();
    }

    geoFunc(geoname) {
        if (IconsComponent.icons[geoname]) return IconsComponent.icons[geoname];
        else return IconsComponent.icons["Screw Pump"];
    }


    accordin() {
        var acc: any = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
            acc[i].nextElementSibling.classList.toggle("hide");
            acc[i].onclick = function () {
                this.classList.toggle("active");
                this.nextElementSibling.classList.toggle("hide");
            }
        }
    }
}