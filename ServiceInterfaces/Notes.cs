using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NotesApi.Model
{
    public class Notes
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string NoteId { set; get; }
        public string DiagramId { set; get; }
        public string TenantId { set; get; }
        public string TenantName { set; get; }

        public string LocationId { set; get; }
        public string CreatedDateTime { set; get; }
        public string CreatedBy { set; get; }
        public string ModifiedDateTime { set; get; }
        public string ModifiedBy { set; get; }
        public string NoteJson { set; get; }

        public Notes()
        {

        }
    }
}
