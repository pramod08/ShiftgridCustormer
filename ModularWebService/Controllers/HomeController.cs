using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ServiceFabric.Services.Remoting.Client;
using Microsoft.ServiceFabric.Services.Client;

using Newtonsoft.Json;

using Newtonsoft.Json.Linq;
using ServiceIntefaces;
using ServiceInterfaces;
using NotesApi.Model;
using System.Diagnostics;
using ModularWebservice.Model;
using ModularWebservice.Controllers;
using Microsoft.IdentityModel.Clients.ActiveDirectory;
namespace ModularWebService.Controllers
{
    public class HomeController : Controller
    {
        
        public IActionResult Index()
        {
            return View();
        }


        [HttpPost]
        public async Task<String> CreateOrInsertDiagramJson([FromBody]InputData diagramData)
        {
            IStatefulDiagramApi info = ServiceProxy.Create<IStatefulDiagramApi>(
            new Uri(uriString: "fabric:/DiagramApp/DiagramApi"),
            new ServicePartitionKey(0));

            String output = await info.GetFromDatabaseWithTenantId(diagramData.data, diagramData.tenantName);

            return output;

        }

        [HttpPost]
        public async Task<String> CreateObjectInfo([FromBody]LocationApi location)
        {

            IStatefulInfoApi info = ServiceProxy.Create<IStatefulInfoApi>(
                            new Uri(uriString: "fabric:/InfoPaneApp/InfoPaneApi"),
                            new ServicePartitionKey(0));

            String output = await info.CreateInfo(location.LocationId, location.NodeType,location.tenantName, location.tenantId);

            return output;

        }
        [HttpGet]
        public async Task<String> GetInfo(String nodeInfo)
        {
            NodeInfo node = JsonConvert.DeserializeObject<NodeInfo>(nodeInfo);
            IStatefulInfoApi info = ServiceProxy.Create<IStatefulInfoApi>(
                            new Uri(uriString: "fabric:/InfoPaneApp/InfoPaneApi"),
                            new ServicePartitionKey(0));

            String output = await info.GetInfo(node.LocationId, node.NodeType,node.tenantName,node.tenantId);

            return output;

        }

        //[HttpGet]
        //public async Task<String> GetDiagramJsonByTenantId(DiagramModel diagramData)
        //{

        //    IStatefulDiagramApi info = ServiceProxy.Create<IStatefulDiagramApi>(
        //               new Uri(uriString: "fabric:/DiagramApp/DiagramApi"),
        //               new ServicePartitionKey(0));
            
        //    String output = await info.GetFromDatabaseWithTenantId(JsonConvert.SerializeObject(diagramData));
        //    return output;
        //}
        

        [HttpGet]
        public async Task<String> GetDiagramInfo(String diagramId, String tenantName)
        {
            IStatefulDiagramApi diagram = ServiceProxy.Create<IStatefulDiagramApi>(
                       new Uri(uriString: "fabric:/DiagramApp/DiagramApi"),
                       new ServicePartitionKey(0));

            String response = await diagram.getDiagramProperties(diagramId);
            return response;

        }
        [HttpGet]
        //public async Task<String> GetDiagramJson(String diagramId)
        //{

        //    IStatefulDiagramApi info = ServiceProxy.Create<IStatefulDiagramApi>(
        //               new Uri(uriString: "fabric:/DiagramApp/DiagramApi"),
        //               new ServicePartitionKey(0));
        //    String output = await info.getFromDatabase(diagramId);

        //    return output;
        //}

        [HttpPut]
        public async Task<String> Put([FromBody]Diagram diagram)
        {
            IStatefulDiagramApi info = ServiceProxy.Create<IStatefulDiagramApi>(
                       new Uri(uriString: "fabric:/DiagramApp/DiagramApi"),
                       new ServicePartitionKey(0));
            String response = await info.updateDiagram(diagram.GUID, diagram.DiagramJson);
            return response;
        }
        [HttpPut]
        public async Task<String> UpdateAreaDiagramJson([FromBody]InputData diagramData)
        {
            IStatefulDiagramApi info = ServiceProxy.Create<IStatefulDiagramApi>(
                    new Uri(uriString: "fabric:/DiagramApp/DiagramApi"),
                    new ServicePartitionKey(0));

            String response = await info.updateAreaDiagramJson(diagramData.data, diagramData.tenantName);

            return response;
        }
        public async Task<String> PutArea([FromBody] Diagram diagram)
        {

            IStatefulDiagramApi info = ServiceProxy.Create<IStatefulDiagramApi>(
                     new Uri(uriString: "fabric:/DiagramApp/DiagramApi"),
                     new ServicePartitionKey(0));

            String response = await info.updateAreaDiagram(diagram.GUID, diagram.DiagramJson);


            return response;
        }


        [HttpPut]
        public async Task<String> UpdateObjectProps([FromBody]String objProps)
        {
            Trace.WriteLine("---------------------------");
            Trace.WriteLine("Started" + DateTime.Now.ToString("h:mm:ss tt"));
            IStatefulInfoApi info = ServiceProxy.Create<IStatefulInfoApi>(
                       new Uri(uriString: "fabric:/InfoPaneApp/InfoPaneApi"),
                       new ServicePartitionKey(0));

            IStatefullErrorApi getinfoDocDB = ServiceProxy.Create<IStatefullErrorApi>(
                            new Uri(uriString: "fabric:/ErrorApp/ErrorApi"),
                            new ServicePartitionKey(0));

            JObject inputData = JObject.Parse(objProps);

            JObject json = JObject.Parse(inputData["data"].ToString());
            string Typedoc = 
                await getinfoDocDB.GetObjectDocument(json["NodeType"].ToString(),inputData["tenantName"].ToString(), inputData["tenantId"].ToString());

            Trace.WriteLine("Getting error info" + DateTime.Now.ToString("h:mm:ss tt"));
            dynamic jsondoc = JsonConvert.DeserializeObject(Typedoc);
            if (jsondoc != null)
            {
                foreach (var docobj in jsondoc)
                {
                    foreach (var js in json)
                    {
                        string key = docobj["Name"];
                        if (js.Key.Equals(key))
                        {
                            if (!(js.Value.ToString().Equals("")))
                            {
                                json["IsMissingField"] = "false";

                            }
                            if ((js.Value.ToString().Equals("")))
                            {

                                json["IsMissingField"] = "true";

                            }
                        }

                    }
                }
            }
            Trace.WriteLine("Updating to database response" + DateTime.Now.ToString("h:mm:ss tt"));

            String response = await info.UpdateObjectProperty(json.ToString(), inputData["tenantName"].ToString(), inputData["tenantId"].ToString());
            Trace.WriteLine("Returning response" + DateTime.Now.ToString("h:mm:ss tt"));

            return response;
        }

        [HttpGet]
        public async Task<string> GetDocument(String diagramId,String tenantName, String tenantID)
        {
            IStatefullErrorApi getinfoDocDB = ServiceProxy.Create<IStatefullErrorApi>(
                     new Uri(uriString: "fabric:/ErrorApp/ErrorApi"),
                     new ServicePartitionKey(0));

            List<ErrorList> errorlist = await getinfoDocDB.GetErrorList(diagramId, tenantName, tenantID);

            string json = JsonConvert.SerializeObject(errorlist);
            return json;
        }


        //Notes Operation

        [HttpPost]
        public async Task<List<Notes>> saveNotes([FromBody]Notes note)
        {
            IStatefulNotesApi noteinfo = ServiceProxy.Create<IStatefulNotesApi>(
                            new Uri(uriString: "fabric:/NotesApp/NotesApi"),
                            new ServicePartitionKey(0));

            List<Notes> list = new List<Notes>();
            list = await noteinfo.saveNote(note.DiagramId, note.LocationId, note.NoteId,
                note.CreatedDateTime, note.NoteJson,note.TenantName, note.TenantId);

            return list;

        }


        [HttpDelete]
        public async Task<List<Notes>> deleteNote(string noteId,string tenantName,String tenantId)
        {
            IStatefulNotesApi noteinfo = ServiceProxy.Create<IStatefulNotesApi>(
                            new Uri(uriString: "fabric:/NotesApp/NotesApi"),
                            new ServicePartitionKey(0));

            List<Notes> list = new List<Notes>();
            list = await noteinfo.deleteNote(noteId, tenantName,tenantId);

            return list;

        }


        [HttpGet]
        public async Task<List<Notes>> getNotesInfo(String locationId,String tenantName, String tenantId)
        {
            IStatefulNotesApi noteinfo = ServiceProxy.Create<IStatefulNotesApi>(
                            new Uri(uriString: "fabric:/NotesApp/NotesApi"),
                            new ServicePartitionKey(0));

            List<Notes> output = await noteinfo.getNotes(locationId,tenantName,tenantId);

            return output;
        }

        [HttpPut]
        public async Task<List<Notes>> updateNote([FromBody]UpdateNotes note)
        {
            IStatefulNotesApi noteinfo = ServiceProxy.Create<IStatefulNotesApi>(
                           new Uri(uriString: "fabric:/NotesApp/NotesApi"),
                           new ServicePartitionKey(0));

            List<Notes> output = await noteinfo.updateNote(note.NoteId, note.DiagramId, 
                note.LocationId, note.ModifiedDateTime, note.NoteJson,note.TenantName,note.TenantId);

            return output;


        }



        //GET api/values/5
        [HttpGet]
        public async Task<IActionResult> GetPeopleById(string id,string tenantName)
        {
            IStatefullPeopleApi iuser = ServiceProxy.Create<IStatefullPeopleApi>(new Uri(uriString: "fabric:/PeopleApp/PeopleApi"), new ServicePartitionKey(0));
            People people = await iuser.getPeopleByID(id,tenantName);
            if (people == null)
            {
                return NotFound();
            }
            else
            {
                return new ObjectResult(people);
            }
        }


        [HttpPut]
        public async Task<String> PutPeople([FromBody]People people)
        {
            IStatefullPeopleApi iuser = ServiceProxy.Create<IStatefullPeopleApi>(new Uri(uriString: "fabric:/PeopleApp/PeopleApi"), new ServicePartitionKey(0));

            String response = await iuser.putPeopleAll(people.Guid, people.jsonData,people.tenantName,people.tenantId);
            return response;
        }







        // Object Search Api Search and Typehead
        [HttpGet]
        public async Task<string> GetSearchDocument(string search,string secretKey)
        {

            IStatefulSearchApi searchobj = ServiceProxy.Create<IStatefulSearchApi>(
                  new Uri(uriString: "fabric:/ObjectSearchApp/ObjectSearchApi"),
                  new ServicePartitionKey(0));

            string output = await searchobj.GetlistDocument(search, secretKey);
            return output;
        }

        [HttpGet]
        public async Task<string> GetSearchDetails(string item, string secretkey)
        {
            IStatefulSearchApi searchobj = ServiceProxy.Create<IStatefulSearchApi>(
                  new Uri(uriString: "fabric:/ObjectSearchApp/ObjectSearchApi"),
                  new ServicePartitionKey(0));

            string output = await searchobj.GetSearchRecord(item, secretkey);
            return output;
        }


        //Object Search API Areas

        [HttpPost]
        public async Task<String> InsertAreaDocObject([FromBody] SearchDetails searchobj)
        {

            IStatefulSearchApi infoDoc = ServiceProxy.Create<IStatefulSearchApi>(
                     new Uri(uriString: "fabric:/ObjectSearchApp/ObjectSearchApi"),
                     new ServicePartitionKey(0));

            String response = await infoDoc.SetAreaObjectDocument(searchobj);
            return response;
        }

        [HttpPut]
        public async Task<String> UpdateTextAreaDocObject([FromBody]SearchDetails searchobj)
        {
            IStatefulSearchApi infoDoc = ServiceProxy.Create<IStatefulSearchApi>(
                     new Uri(uriString: "fabric:/ObjectSearchApp/ObjectSearchApi"),
                     new ServicePartitionKey(0));

            String response = await infoDoc.UpdateAreaObjectDocument(searchobj);
            return response;
        }

        [HttpDelete]
        public async Task<String> DeletingAreaDocObject(string deleteid, string secretkey)
        {
            IStatefulSearchApi infoDoc = ServiceProxy.Create<IStatefulSearchApi>(
                    new Uri(uriString: "fabric:/ObjectSearchApp/ObjectSearchApi"),
                    new ServicePartitionKey(0));

            String response = await infoDoc.deletingAreaobjectDocument(deleteid, secretkey);
            return response;
        }


        //Object Search Api Location Group

        [HttpPost]
        public async Task<String> InsertLoc_GroupDocObject([FromBody] SearchDetails searchobj)
        {

            IStatefulSearchApi infoDoc = ServiceProxy.Create<IStatefulSearchApi>(
                     new Uri(uriString: "fabric:/ObjectSearchApp/ObjectSearchApi"),
                     new ServicePartitionKey(0));

            String response = await infoDoc.SetLocGroupDoc(searchobj);
            return response;
        }


        [HttpPut]
        public async Task<String> EditingText_GroupDocObject([FromBody]SearchDetails searchobj)
        {
            IStatefulSearchApi infoDoc = ServiceProxy.Create<IStatefulSearchApi>(
                     new Uri(uriString: "fabric:/ObjectSearchApp/ObjectSearchApi"),
                     new ServicePartitionKey(0));

            String response = await infoDoc.UpdateLocGroupObjectDoc(searchobj);
            return response;
        }

        [HttpDelete]
        public async Task<String> DeletingLoc_GroupDocObject(string deleteid, string secretkey)
        {
            IStatefulSearchApi infoDoc = ServiceProxy.Create<IStatefulSearchApi>(
                    new Uri(uriString: "fabric:/ObjectSearchApp/ObjectSearchApi"),
                    new ServicePartitionKey(0));

            String response = await infoDoc.deletingLocGroupobjectDoc(deleteid, secretkey);
            return response;
        }

        //Object Search Api People
        [HttpPost]
        public async Task<String> InsertPeopleDocObject([FromBody] SearchDetails searchobj)
        {

            IStatefulSearchApi infoDoc = ServiceProxy.Create<IStatefulSearchApi>(
                     new Uri(uriString: "fabric:/ObjectSearchApp/ObjectSearchApi"),
                     new ServicePartitionKey(0));

            String response = await infoDoc.SetPeopleDoc(searchobj);
            return response;
        }

        [HttpPut]
        public async Task<String> EditingText_PeopleDocObject([FromBody]SearchDetails searchobj)
        {
            IStatefulSearchApi infoDoc = ServiceProxy.Create<IStatefulSearchApi>(
                     new Uri(uriString: "fabric:/ObjectSearchApp/ObjectSearchApi"),
                     new ServicePartitionKey(0));

            String response = await infoDoc.UpdatePeopleObjectDoc(searchobj);
            return response;
        }

        [HttpDelete]
        public async Task<String> DeletingPeopleDocObject(string deleteid, string secretkey)
        {
            IStatefulSearchApi infoDoc = ServiceProxy.Create<IStatefulSearchApi>(
                    new Uri(uriString: "fabric:/ObjectSearchApp/ObjectSearchApi"),
                    new ServicePartitionKey(0));

            String response = await infoDoc.deletingPeopleobjectDoc(deleteid, secretkey);
            return response;
        }

        //Insert People With Title Document
        [HttpPost]
        public async Task<String> InsertPeopleWithTitleDocObject([FromBody] SearchDetails searchobj)
        {
            IStatefulSearchApi infoDoc = ServiceProxy.Create<IStatefulSearchApi>(
                     new Uri(uriString: "fabric:/ObjectSearchApp/ObjectSearchApi"),
                     new ServicePartitionKey(0));
            String response = await infoDoc.SetPeopleWithTitleDoc(searchobj);
            return response;
        }

        [HttpPut]
        public async Task<String> EditingText_PeopleTitleDocObject([FromBody]SearchDetails searchobj)
        {
            IStatefulSearchApi infoDoc = ServiceProxy.Create<IStatefulSearchApi>(
                     new Uri(uriString: "fabric:/ObjectSearchApp/ObjectSearchApi"),
                     new ServicePartitionKey(0));

            String response = await infoDoc.UpdatePeopleWithTitleObjectDoc(searchobj);
            return response;
        }

        //[HttpPost]
        //public async Task<String> PostPassword([FromBody]Company email)
        //{
        //    LoginCompany com = new LoginCompany();
        //    string response = await com.sendResetPassword(email.mail);
        //    return await Task.FromResult(response);
        //}


        
            [HttpGet]
        public async Task<String> GetTenantId(String tenantName)
        {
            IStatefulDiagramApi info = ServiceProxy.Create<IStatefulDiagramApi>(
           new Uri(uriString: "fabric:/DiagramApp/DiagramApi"),
           new ServicePartitionKey(0));


            String output = await info.GetTenantId(tenantName);
            
            return    output;

        }

    }
}
