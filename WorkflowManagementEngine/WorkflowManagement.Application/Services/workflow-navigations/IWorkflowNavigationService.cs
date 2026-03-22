using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkflowManagement.Application.DTOs;

namespace WorkflowManagement.Application.Services.workflow_navigations
{
    public interface  IWorkflowNavigationService
    {
        Task<WorkflowNavigationDto> GetNextAndPreviousTasks(
      Guid workflowId,
      string currentTaskId,
      Dictionary<string, object>? inputData = null);

    }
}
