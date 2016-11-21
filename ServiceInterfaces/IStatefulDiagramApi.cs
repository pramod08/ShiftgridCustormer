
using Microsoft.ServiceFabric.Services.Remoting;
using ServiceInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceIntefaces
{
    public interface IStatefulDiagramApi: IService
    {
         Task<String> getFromDatabase(String GUID, String tenantName, String tenantId);

  //      Task<String> GetFromDatabaseWithTenantId(String diagramData);
        Task<String> GetFromDatabaseWithTenantId(String diagramData, String tenantName);

        Task<string> updateDiagram(String guid, String diagram);

        Task<string> updateAreaDiagram(String guid, String diagram);
        Task<string> updateAreaDiagramJson(String diagramData, String tenantName);

        Task<String> getDiagramProperties(String guid);

        Task<String> ConnectionStringForInfo(String tenantName, String tenantId);
        Task<String> ConnectionStringForObjectSearch(String secretkey);


        Task<String> GetTenantId(String tenantName);

    }
}
