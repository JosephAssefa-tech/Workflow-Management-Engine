using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkflowManagement.Application.Interfaces
{
    public interface IWorkflowRunner
    {
        Task<string> StartWorkflowAsync(string definitionId, IDictionary<string, object>? input = null);
        Task ResumeWorkflowAsync(string instanceId, IDictionary<string, object>? variables = null);
    }
}
