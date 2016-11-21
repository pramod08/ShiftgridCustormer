"use strict";
var Notes = (function () {
    function Notes(NoteId, TenantId, LocationId, CreatedDateTime, CreatedBy, ModifiedDateTime, ModifiedBy, NoteJson) {
        this.NoteId = NoteId;
        this.TenantId = TenantId;
        this.LocationId = LocationId;
        this.CreatedDateTime = CreatedDateTime;
        this.CreatedBy = CreatedBy;
        this.ModifiedDateTime = ModifiedDateTime;
        this.ModifiedBy = ModifiedBy;
        this.NoteJson = NoteJson;
    }
    return Notes;
}());
exports.Notes = Notes;
//# sourceMappingURL=Notes.js.map