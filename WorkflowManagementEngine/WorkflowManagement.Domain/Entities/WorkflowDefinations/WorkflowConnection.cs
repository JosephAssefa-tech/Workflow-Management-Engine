using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkflowManagement.Domain.Entities.WorkflowDefinations
{
    public class WorkflowConnection
    {
        public Guid Id { get; set; }
        public Guid WorkflowId { get; set; }

        public string SourceTaskId { get; set; }
        public string TargetTaskId { get; set; }

        public string? Condition { get; set; } 

    }
}
