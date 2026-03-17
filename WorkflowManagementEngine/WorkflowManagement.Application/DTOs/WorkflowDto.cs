using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkflowManagement.Application.DTOs
{
    public class WorkflowDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public bool IsPublished { get; set; }
        public string Xml { get; set; }
    }
}
