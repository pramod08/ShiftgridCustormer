using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceIntefaces
{
    public interface IStatefulInfoApi: IService
    {
        Task<String> CreateInfo(String locationID, String nodeType,String tenantName, String tenantId);

        Task<String> GetInfo(String locationID, String nodeType, String tenantName, String tenantId);
        Task<String> UpdateObjectProperty(String objectProps, String tenantName, String tenantId);

    }
}
