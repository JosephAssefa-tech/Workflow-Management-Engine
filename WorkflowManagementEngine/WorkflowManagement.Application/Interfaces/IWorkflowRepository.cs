using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkflowManagement.Domain.Entities.WorkflowDefinations;

namespace WorkflowManagement.Application.Interfaces
{
    public interface IWorkflowRepository
    {
        Task AddAsync(Workflow workflow);
        Task<Workflow?> GetByIdAsync(Guid id);
        Task<List<Workflow>> GetAllAsync();
        Task<Workflow?> GetLatestByNameAsync(string name);
    }
}
