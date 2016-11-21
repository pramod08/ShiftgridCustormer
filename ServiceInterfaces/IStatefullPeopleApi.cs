using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceInterfaces
{
   public interface IStatefullPeopleApi : IService
    {

        Task<string> putPeopleAll(String guid, String jsonData,string tenantName,string tenantId );

        Task<People> getPeopleByID(string id,string tenantName);




    }
}
