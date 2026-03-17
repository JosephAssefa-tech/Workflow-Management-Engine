using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WorkflowManagement.Application.Interfaces;
using WorkflowManagement.Domain.Entities.WorkflowDefinations;
using WorkflowManagement.Infrastructure.DatabaseContext;

namespace WorkflowManagement.Infrastructure.Persistence
{
    public class WorkflowRepository : IWorkflowRepository
    {
        private readonly WorkflowDbContext _dbContext;

        public WorkflowRepository(WorkflowDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task AddAsync(WorkflowDefinition workflow)
        {
            await _dbContext.WorkflowDefinitions.AddAsync(workflow);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<WorkflowDefinition>> GetAllAsync()
        {
            return await _dbContext.WorkflowDefinitions.ToListAsync();
        }

        public async Task<WorkflowDefinition?> GetByIdAsync(Guid id)
        {
            return await _dbContext.WorkflowDefinitions.FindAsync(id);
        }
    }
}
