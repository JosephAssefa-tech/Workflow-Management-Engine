using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkflowManagement.Domain.Entities.WorkflowDefinations
{
    public class WorkflowTask
    {
        public Guid Id { get; set; }              // DB identity
        public Guid WorkflowId { get; set; }      // FK → Workflow
        public string BpmnTaskId { get; set; }    // BPMN task ID
        public string Name { get; set; }          // Task name
    }
}
