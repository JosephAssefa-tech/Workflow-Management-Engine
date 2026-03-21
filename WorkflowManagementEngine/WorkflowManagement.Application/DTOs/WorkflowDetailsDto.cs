using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkflowManagement.Application.DTOs
{
    public class WorkflowDetailsDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<TaskDto> Tasks { get; set; }
    }
}
