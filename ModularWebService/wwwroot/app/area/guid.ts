

export class Guid {
    static generateGuid(s?) {
        var p = (Math.random().toString(16) + "000000000").substr(2, 8);
        return s ? "-" + p.substr(0, 4) + "-" + p.substr(4, 4) : p;
    }
    getguid() {
        return Guid.generateGuid() + Guid.generateGuid(true) + Guid.generateGuid(true) + Guid.generateGuid();

    }

    //Diagram GUID
    static generateDiagramGuid(s?) {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    getDiagramGuid() {
        return (Guid.generateDiagramGuid() + Guid.generateDiagramGuid() + "-" + Guid.generateDiagramGuid() + "-4" + Guid.generateDiagramGuid().substr(0, 3) + "-" + Guid.generateDiagramGuid() + "-" + Guid.generateDiagramGuid() + Guid.generateDiagramGuid() + Guid.generateDiagramGuid()).toLowerCase();
    }

    //Notes GUID
    static generateNotesGuid(s?) {
        return (((3 + Math.random()) * 0x15000) | 0).toString(16).substring(1);
    }
    getNotesGuid() {
        return (Guid.generateDiagramGuid() + Guid.generateDiagramGuid() + "-" + Guid.generateDiagramGuid() + "-4" + Guid.generateDiagramGuid().substr(0, 3) + "-" + Guid.generateDiagramGuid() + "-" + Guid.generateDiagramGuid() + Guid.generateDiagramGuid() + Guid.generateDiagramGuid()).toLowerCase();
    }
}
