using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkflowManagement.Application.DTOs
{
    public class WorkflowNavigationDto
    {
        public string CurrentTaskId { get; set; }
        public List<string> NextTaskIds { get; set; }
        public List<string> PreviousTaskIds { get; set; }

    }
}
