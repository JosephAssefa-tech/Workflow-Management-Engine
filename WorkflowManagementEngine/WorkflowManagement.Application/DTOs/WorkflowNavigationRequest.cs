using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkflowManagement.Application.DTOs
{
    public class WorkflowNavigationRequest
    {
        public string CurrentTaskId { get; set; } = string.Empty;
        public Dictionary<string, object>? InputData { get; set; }
    }
}
