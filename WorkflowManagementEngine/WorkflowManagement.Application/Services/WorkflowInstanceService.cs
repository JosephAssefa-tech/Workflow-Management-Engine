using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkflowManagement.Application.Interfaces;

namespace WorkflowManagement.Application.Services
{
    public class WorkflowInstanceService
    {
        private readonly IWorkflowInstanceRepository _repository;

        public WorkflowInstanceService(IWorkflowInstanceRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<object>> GetAllInstancesAsync()
        {
            var instances = await _repository.GetAllInstancesAsync(); // returns List<WorkflowInstance>

            return instances.Select(i => new
            {
                i.Id,
               i.DefinitionId,
                WorkflowName = i.Name, // from Elsa Definition
                Status = i.WorkflowStatus.ToString(),
                i.CreatedAt,
                i.LastExecutedAt
            })
            .Cast<object>()   // cast each anonymous type to object
            .ToList();
        }

        public async Task<object?> GetInstanceAsync(string id)
        {
            var instance = await _repository.GetByIdAsync(id); // returns WorkflowInstance
            if (instance == null) return null;

            return new
            {
                instance.Id,
              //  instance.WorkflowDefinitionId,
                WorkflowName = instance.Name,
                Status = instance.WorkflowStatus.ToString(),
                Variables = instance.Variables,
                instance.CreatedAt,
                instance.LastExecutedAt,
                CurrentActivityId = instance.CurrentActivity?.ActivityId
            } as object;  // cast to object
        }

    }
}
