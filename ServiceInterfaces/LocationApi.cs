using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceInterfaces
{
    public class LocationApi
    {
        public String XCoordinate { set; get; }
        public String YCoordinate { set; get; }
        public String LocationId { set; get; }
        public String NodeType { set; get; }
        public bool IsMissingField { get; set; }

        public LocationApi()
        {
        }
    }
}
