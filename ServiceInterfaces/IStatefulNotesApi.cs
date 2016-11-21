using Microsoft.ServiceFabric.Services.Remoting;
using NotesApi.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceInterfaces
{
    public interface IStatefulNotesApi : IService
    {
        Task<List<Notes>> saveNote(String diagramId,String locationId, 
                String noteId, String CreatedDateTime, String noteJson,string tenantName, string tenantId);

        Task<List<Notes>> getNotes(String locationId, string tenantName, string tenantId);
        Task<List<Notes>> updateNote(String noteId, String diagramId, 
            String locationId, String ModifiedDateTime, String noteJson, string tenantName, string tenantId);
        Task<List<Notes>> deleteNote(String locationId, string tenantName, string tenantId);
    }
}
