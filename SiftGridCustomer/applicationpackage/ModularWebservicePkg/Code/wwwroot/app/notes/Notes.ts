export class Notes {

    public NoteId;
    public TenantId;
    public LocationId;
    public CreatedDateTime;
    public CreatedBy;
    public ModifiedDateTime;
    public ModifiedBy;
    public  NoteJson;
    public constructor(NoteId: String, TenantId: String, LocationId: String, CreatedDateTime: String,
        CreatedBy: String, ModifiedDateTime: String, ModifiedBy: String, NoteJson: String)
    {

        this.NoteId = NoteId;
        this.TenantId = TenantId;
        this.LocationId = LocationId;
        this.CreatedDateTime = CreatedDateTime;
        this.CreatedBy = CreatedBy;
        this.ModifiedDateTime = ModifiedDateTime;
        this.ModifiedBy = ModifiedBy;
        this.NoteJson = NoteJson;
    }

}

