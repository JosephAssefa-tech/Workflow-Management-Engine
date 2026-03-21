using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkflowManagement.Domain.Entities.WorkflowDefinations
{
    public class Workflow
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;

        public string BpmnProcessId { get; set; }    // BPMN internal ID
        public string ElsaJson { get; set; } = string.Empty;
        public bool IsPublished { get; set; }
        public int? Version { get; set; } = 1;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
