using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceInterfaces
{
   public interface IStatefullErrorApi : IService
    {

        Task<string> GetObjectDocument(string nodeType, String tenantName, String TenatId);
        Task<List<ErrorList>> GetErrorList(string diagramId, String tenantName, String TenatId);



    }
}
