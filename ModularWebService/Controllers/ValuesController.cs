using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ModularWebservice.Model;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ModularWebservice.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        [HttpPost]
        public async Task<String> PostFindCompany([FromBody]Company company)
        {
            LoginCompany com = new LoginCompany();
            string response = await com.sendFindcompany(company.mail, company.userPrincipalName);
            return await Task.FromResult(response);

        }

    }
}
