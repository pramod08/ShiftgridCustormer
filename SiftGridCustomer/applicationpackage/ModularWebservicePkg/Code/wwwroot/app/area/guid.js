"use strict";
var Guid = (function () {
    function Guid() {
    }
    Guid.generateGuid = function (s) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    };
    Guid.prototype.getguid = function () {
        return Guid.generateGuid() + Guid.generateGuid(true) + Guid.generateGuid(true) + Guid.generateGuid();
    };
    //Diagram GUID
    Guid.generateDiagramGuid = function (s) {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    Guid.prototype.getDiagramGuid = function () {
        return (Guid.generateDiagramGuid() + Guid.generateDiagramGuid() + "-" + Guid.generateDiagramGuid() + "-4" + Guid.generateDiagramGuid().substr(0, 3) + "-" + Guid.generateDiagramGuid() + "-" + Guid.generateDiagramGuid() + Guid.generateDiagramGuid() + Guid.generateDiagramGuid()).toLowerCase();
    };
    //Notes GUID
    Guid.generateNotesGuid = function (s) {
        return (((3 + Math.random()) * 0x15000) | 0).toString(16).substring(1);
    };
    Guid.prototype.getNotesGuid = function () {
        return (Guid.generateDiagramGuid() + Guid.generateDiagramGuid() + "-" + Guid.generateDiagramGuid() + "-4" + Guid.generateDiagramGuid().substr(0, 3) + "-" + Guid.generateDiagramGuid() + "-" + Guid.generateDiagramGuid() + Guid.generateDiagramGuid() + Guid.generateDiagramGuid()).toLowerCase();
    };
    return Guid;
}());
exports.Guid = Guid;
//# sourceMappingURL=guid.js.map