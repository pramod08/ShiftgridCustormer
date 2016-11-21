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
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var company_component_1 = require('./company/company.component');
var AuthenticatedHttpService_1 = require('./auth/AuthenticatedHttpService');
var AzureADAuthHelper_1 = require('./auth/AzureADAuthHelper');
var Authenticator_1 = require('./auth/Authenticator');
var ServiceConstants_1 = require('./auth/ServiceConstants');
var password_reset_component_1 = require('./passwordreset/password-reset.component');
var find_company_component_1 = require('./findcompany/find-company.component');
var signin_component_1 = require('./signin/signin.component');
var reminder_component_1 = require('./reminder/reminder.component');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var UIBackground_component_1 = require('./UIBackground/UIBackground.component');
var header_component_1 = require('./Header/header.component');
var enterprise_component_1 = require('./EnteprisePane/enterprise.component');
var leftsidebar_component_1 = require('./leftsidebar/leftsidebar.component');
var rightsidebar_component_1 = require('./rightsidebar/rightsidebar.component');
var footer_component_1 = require('./footer/footer.component');
var siftgridbutton_component_1 = require('./siftgridbutton/siftgridbutton.component');
var enterprisebutton_component_1 = require('./enterprisebutton/enterprisebutton.component');
var drawingbutton_component_1 = require('./drawingbutton/drawingbutton.component');
var enterpriseheader_component_1 = require('./enterpriseheader/enterpriseheader.component');
var areabutton_component_1 = require('./areabutton/areabutton.component');
var locationbutton_component_1 = require('./locationbutton/locationbutton.component');
var groupbutton_component_1 = require('./groupbutton/groupbutton.component');
var peoplebutton_component_1 = require('./peoplebutton/peoplebutton.component');
var volumetricbutton_component_1 = require('./volumetricbutton/volumetricbutton.component');
var infobutton_component_1 = require('./infobutton/infobutton.component');
var perspectivesbutton_component_1 = require('./perspectivesbutton/perspectivesbutton.component');
var notesbutton_component_1 = require('./notesbutton/notesbutton.component');
var chatbutton_component_1 = require('./chatbutton/chatbutton.component');
var documentationbutton_component_1 = require('./documentationbutton/documentationbutton.component');
var errorbutton_component_1 = require('./errorbutton/errorbutton.component');
var fuelconsumersbutton_component_1 = require('./fuelconsumersbutton/fuelconsumersbutton.component');
var infoperspectivespane_component_1 = require('./infoperspectivespane/infoperspectivespane.component');
var documentationpane_component_1 = require('./documentationpane/documentationpane.component');
var headersearchbox_component_1 = require('./headersearchbox/headersearchbox.component');
var diagramarea_component_1 = require('./diagramarea/diagramarea.component');
var errorpane_component_1 = require('./errorpane/errorpane.component');
var fuelconsumerspane_component_1 = require('./fuelconsumerspane/fuelconsumerspane.component');
var mapbutton_component_1 = require('./mapbutton/mapbutton.component');
var dashboardbutton_component_1 = require('./dashboardbutton/dashboardbutton.component');
var area_component_1 = require('./area/area.component');
var areaService_1 = require('./area/areaService');
var searchService_1 = require('./search/searchService');
var diagram_component_1 = require('./diagram/diagram.component');
var diagramService_1 = require('./diagram/diagramService');
var people_component_1 = require('./people/people.component');
var peopleService_1 = require('./people/peopleService');
var notesService_1 = require('./notes/notesService');
var notes_component_1 = require('./notes/notes.component');
var errorService_1 = require('./errorpane/errorService');
var palette_component_1 = require('./palette/palette.component');
var areapalette_component_1 = require('./areapalette/areapalette.component');
var palettebutton_component_1 = require('./palettebutton/palettebutton.component');
var profilenotificationicon_component_1 = require('./profilenotification/profilenotificationicon.component');
var profilename_component_1 = require('./profilename/profilename.component');
var profileavatar_component_1 = require('./profileavatar/profileavatar.component');
var userprofile_component_1 = require('./userprofile/userprofile.component');
var forms_1 = require("@angular/forms");
var locationtree_component_1 = require('./locationtree/locationtree.component');
var AspectRatioService_1 = require('./aspectratiocalculation/AspectRatioService');
var azureADAuthHelper = new AzureADAuthHelper_1.AzureADAuthHelper(new ServiceConstants_1.ServiceConstants("ba1c6ed5-9779-46a7-ac42-7ddcc5c878d2", "dev-tenant.siftgrid.com", "http://dev3.centralus.cloudapp.azure.com:8080/"));
var authenticator = new Authenticator_1.Authenticator(azureADAuthHelper);
function authenticatorFactory() {
    return authenticator;
}
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                http_1.JsonpModule,
                router_1.RouterModule.forRoot([
                    { path: '', component: app_component_1.AppComponent },
                    { path: 'company', component: company_component_1.CompanyComponent },
                    { path: 'findcompany', component: find_company_component_1.FindCompanyComponent },
                    { path: 'login', component: signin_component_1.SignInComponent },
                    { path: 'reminder', component: reminder_component_1.Reminder },
                    { path: 'resetpassword', component: password_reset_component_1.PasswordResetComponent },
                    { path: 'UIBackground', component: UIBackground_component_1.UIBackgroundComponent },
                ])],
            declarations: [
                app_component_1.AppComponent,
                company_component_1.CompanyComponent,
                find_company_component_1.FindCompanyComponent,
                signin_component_1.SignInComponent,
                password_reset_component_1.PasswordResetComponent,
                reminder_component_1.Reminder,
                UIBackground_component_1.UIBackgroundComponent,
                header_component_1.HeaderComponent,
                leftsidebar_component_1.LeftSidebarComponent,
                enterprise_component_1.EnterprisePaneComponent,
                rightsidebar_component_1.RightSidebarComponent,
                footer_component_1.FooterComponent,
                siftgridbutton_component_1.SiftGridButtonComponent,
                enterprisebutton_component_1.EnterpriseButtonComponent,
                drawingbutton_component_1.DrawingButtonComponent,
                enterpriseheader_component_1.EntepriseHeaderComponent,
                areabutton_component_1.AreaButtonComponent,
                locationbutton_component_1.LocationsButtonComponent,
                groupbutton_component_1.GroupsButtonComponent,
                peoplebutton_component_1.PeopleButtonComponent,
                volumetricbutton_component_1.VolumetricsButtonComponent,
                infobutton_component_1.InfoButtonComponent,
                perspectivesbutton_component_1.PerspectivesButtonComponent,
                notesbutton_component_1.NotesButtonComponent,
                chatbutton_component_1.ChatButtonComponent,
                documentationbutton_component_1.DocumentsButtonComponent,
                errorbutton_component_1.ErrorsButtonComponent,
                fuelconsumersbutton_component_1.FuelConsumersButtonComponent,
                infoperspectivespane_component_1.InfoPerspectivesPaneComponent,
                documentationpane_component_1.DocumentationPaneComponent,
                headersearchbox_component_1.HeaderSeachboxComponent,
                diagramarea_component_1.DiagramAreaComponent,
                errorpane_component_1.ErrorPaneComponent,
                fuelconsumerspane_component_1.FuelConsumersPaneComponent,
                mapbutton_component_1.MapButtonComponent,
                dashboardbutton_component_1.DashboardButtonComponent,
                area_component_1.AreaComponent,
                diagram_component_1.DiagramComponent,
                people_component_1.PeopleComponent,
                palette_component_1.PaletteComponent,
                areapalette_component_1.AreaPaletteComponent, notes_component_1.NotesComponent,
                palettebutton_component_1.PaletteButtonComponent,
                profilenotificationicon_component_1.ProfileNotificationIconComponent,
                profilename_component_1.ProfileNameComponent,
                profileavatar_component_1.ProfileAvatarComponent,
                userprofile_component_1.UserProfileComponent,
                locationtree_component_1.LocationTree
            ],
            bootstrap: [app_component_1.AppComponent
            ],
            providers: [
                AspectRatioService_1.AspectRatioService,
                areaService_1.AreaService,
                searchService_1.SearchService,
                diagramService_1.DiagramService,
                peopleService_1.PeopleService,
                notesService_1.NotesService,
                errorService_1.ErrorService,
                AuthenticatedHttpService_1.AuthenticatedHttpService,
                { provide: Authenticator_1.Authenticator, useFactory: authenticatorFactory }
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map