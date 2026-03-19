using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkflowManagement.Domain.Entities.WorkflowDefinations;

namespace WorkflowManagement.Application.Interfaces
{
    public interface IWorkflowPublisher
    {
        Task<string> PublishAsync(string workflowJson);
    }
}
