using Microsoft.ServiceFabric.Services.Remoting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceInterfaces
{
    public interface IStatefulSearchApi : IService
    {
        // Object Search Api Search and Typehead 
        Task<string> GetlistDocument(string character, String secretKey);
        Task<string> GetSearchRecord(string item, String secretKey);

        // Object Search Api Areas 
        Task<string> SetAreaObjectDocument(SearchDetails searchobj);
        Task<string> UpdateAreaObjectDocument(SearchDetails searchobj);
        Task<string> deletingAreaobjectDocument(string deleteid, String secretKey);

        // Object Search Api Location Group
        Task<string> SetLocGroupDoc(SearchDetails searchobj);
        Task<string> UpdateLocGroupObjectDoc(SearchDetails searchobj);
        Task<string> deletingLocGroupobjectDoc(string deleteid, String secretKey);

        // Object Search Api People
        Task<string> SetPeopleDoc(SearchDetails searchobj);
        Task<string> UpdatePeopleObjectDoc(SearchDetails searchobj);
        Task<string> deletingPeopleobjectDoc(string deleteid, String secretKey);



        //Object Search Api People Title

        Task<string> SetPeopleWithTitleDoc(SearchDetails searchobj);

        Task<string> UpdatePeopleWithTitleObjectDoc(SearchDetails searchobj);



    }
}
