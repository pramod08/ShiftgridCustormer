
export class LocationData {

    public LocationId: string;
    public InfoId: string;
    public TenantID: string;
    public Name: string;
    public CreatedBy: string;
    public CreatedDateTime: string;
    public ModifiedDataTime: string;
    public ModifiedBy: string;
    public Type: string;
    public Latitude: string;
    public Longitude: string;
    public DiagramId: string;
    public XCoordinate: string;
    public YCoordinate: string;
    public TieInStatus: string;
    public Status: string;
    public IsMissingField: boolean;


    public LocationData() {
        this.LocationId = "User1";
        this.InfoId="I";
        this.TenantID="as";
        this.Name="";
        this.CreatedBy="";
        this.CreatedDateTime="";
        this.ModifiedDataTime="";
        this.ModifiedBy="";
        this.Type="";
        this.Latitude="";
        this.Longitude="";
        this.DiagramId="";
        this.XCoordinate="";
        this.YCoordinate="";
        this.TieInStatus="";
        this.Status = "";
        this.IsMissingField = true;
    }
}