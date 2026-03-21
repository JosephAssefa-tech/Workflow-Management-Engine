using Elsa.Models;
using Elsa.Persistence;
using Elsa.Persistence.Specifications;
using Elsa.Persistence.Specifications.WorkflowInstances;
using Elsa.Persistence.EntityFramework.Core.Services;
using WorkflowManagement.Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using WorkflowManagement.Application.DTOs;


namespace WorkflowManagement.Infrastructure.Persistence
{
    public class WorkflowInstanceRepository : IWorkflowInstanceRepository
    {
        private readonly IElsaContextFactory _contextFactory;
        private readonly IWorkflowInstanceStore _store;

        public WorkflowInstanceRepository(IElsaContextFactory contextFactory,IWorkflowInstanceStore store)
        {
            _store = store;
            _contextFactory = contextFactory;
        }

        public async Task<IEnumerable<WorkflowInstance>> GetAllInstancesAsync()
        {
            using var context = _contextFactory.CreateDbContext();

            return await (from instance in context.WorkflowInstances
                          join definition in context.WorkflowDefinitions
                          on instance.DefinitionId equals definition.DefinitionId
            where definition.IsLatest
                          select new WorkflowInstance
                          {
                              Id = instance.Id,
                              DefinitionId = instance.DefinitionId,
                              Version = instance.Version,
                              Name = definition.DisplayName ?? definition.Name,
                              WorkflowStatus = instance.WorkflowStatus,

                              
                             CreatedAt = definition.CreatedAt,
                             LastExecutedAt = instance.LastExecutedAt,
                            //                  ? instance.LastExecutedAt.Value.ToDateTimeUtc().ToString("yyyy-MM-dd HH:mm:ss")
                             //                  : null
                          }).ToListAsync();
        }



        public async Task<WorkflowInstance?> GetByIdAsync(string id)
        {
            return await _store.FindAsync(new WorkflowInstanceIdSpecification(id));
        }

    }
}