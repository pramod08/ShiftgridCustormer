using SendWithUs.Client;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Threading.Tasks.Dataflow;

namespace ModularWebservice.Model
{
    public class LoginCompany : System.Web.UI.Page
    {
        public async Task<string> sendFindcompany(string email, string userPrincipalName)
        {
            try
            {
                string[] words = userPrincipalName.Split('@');

                var templtaeData = new Dictionary<string, Object>();
                templtaeData.Add("User_Name", words[0]);
                templtaeData.Add("TenantSpecificLogin", "http://dev3.centralus.cloudapp.azure.com/#/signin");
                templtaeData.Add("Domain_Name", words[1]);
                templtaeData.Add("Company_Name", userPrincipalName);

                var link = new Dictionary<string, string>();
                link.Add("url", "https://www.sendwithus.com");
                link.Add("text", "sendwithus!");
                templtaeData.Add("link", link);

                var request = new SendRequest
                {
                    TemplateId = "tem_jVgQnnGGFnb4J2Wo6rGkNj",
                    SenderName = "siftgrid",
                    SenderAddress = "gpallister@siftgrid.com",
                    RecipientAddress = email,
                    Data = templtaeData
                };
                //   request.Headers.Add("", "");
                var client = new SendWithUsClient("live_e25beff59128a8eb6fcca5e59fe4780705e0c093");
                var response = client.SendAsync(request);
                string res = "Sucess..";
                return await Task.FromResult(res);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<string> sendResetPassword(string email)
        {
            try
            {
                //var templtaeData = new Dictionary<string, Object>();
                //var link = new Dictionary<string, string>();
                //link.Add("url", "https://www.sendwithus.com");
                //link.Add("text", "sendwithus!");
                //templtaeData.Add("link", link);

                var request = new SendRequest
                {
                    TemplateId = "tem_cFctSPepBcoEZ3owsxFbdk",
                    SenderName = "siftgrid",
                    SenderAddress = "gpallister@siftgrid.com",
                    RecipientAddress = email,
                };
                //   request.Headers.Add("", "");
                var client = new SendWithUsClient("live_e25beff59128a8eb6fcca5e59fe4780705e0c093");
                var response = client.SendAsync(request);
                string res = "Sucess..";
                return await Task.FromResult(res);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }
}
