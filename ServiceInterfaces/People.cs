using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ServiceInterfaces
{
  public  class People
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string Guid { get; set; }

        public string jsonData { get; set; }

        public string tenantName { get; set; }
        public string tenantId { get; set; }

    }
}
