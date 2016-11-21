using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceInterfaces
{
    public class ErrorList
    {
        public string LocationId { set; get; }
        public string Type { set; get; }
        public string Missing_Field { set; get; }
        public string ContentType { set; get; }
        public string ValidationType { set; get; }

        public string FieldName { set; get; }

    }
}
