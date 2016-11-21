using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ModularWebService.Controllers
{
    public class UpdateNotes
    {

        public String NoteId { get; set; }
        public String DiagramId { get; set; }
        public String LocationId { get; set; }
        public String ModifiedDateTime { get; set; }
        public String NoteJson { get; set; }
        public string TenantId { set; get; }
        public string TenantName { set; get; }
    }
}
