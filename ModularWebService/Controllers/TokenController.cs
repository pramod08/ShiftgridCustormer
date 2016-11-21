using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using Newtonsoft.Json.Linq;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace ModularWebservice.Controllers
{
    public class TokenController : Controller
    {
        [HttpGet]
        public async Task<string> getToken()
        {

            List<KeyValuePair<string, string>> vals = new List<KeyValuePair<string, string>>();

            vals.Add(new KeyValuePair<string, string>("grant_type", "client_credentials"));

            // vals.Add(new KeyValuePair<string, string>("scope", "openid"));

            //vals.Add(new KeyValuePair<string, string>("resource", "http://dev2.siftgrid.com/"));

            vals.Add(new KeyValuePair<string, string>("client_id", "ba1c6ed5-9779-46a7-ac42-7ddcc5c878d2"));

            vals.Add(new KeyValuePair<string, string>("client_secret", "Gb0/8PGhbzP4dHbjZwcge4ZjdpSG2jjbxFoFqb9wpv8="));

            //vals.Add(new KeyValuePair<string, string>("username", "vikash.singh@bizruntime.com"));

            //vals.Add(new KeyValuePair<string, string>("password", "bizruntime@123"));
            //create the post Url

            //https://login.windows.net/8864cb2f-031a-5c22-fa2d-13d1cf4cb7dd/oauth2/token

            string url = string.Format("https://login.microsoftonline.com/{0}/oauth2/token", "e9219785-a608-4689-ba1e-96dbc118f85c");

            //make the request

            HttpClient hc = new HttpClient();

            //form encode the data we’re going to POST

            HttpContent content = new FormUrlEncodedContent(vals);

            //plug in the post body

            HttpResponseMessage hrm = hc.PostAsync(url, content).Result;
            string token = null;

            if (hrm.IsSuccessStatusCode)

            {
                var result = await hrm.Content.ReadAsStringAsync();

                token = JObject.Parse(result)["access_token"].ToString();
            }

            using (var client = new HttpClient(new HttpClientHandler()))
            {
                client.DefaultRequestHeaders.Add("Authorization", "Bearer " + token);
                Console.WriteLine("----token---" + token);
                client.BaseAddress = new Uri("https://management.azure.com/");

                //  await createDomain(client, companyname);
            }
            return token;
        }

    }
}
