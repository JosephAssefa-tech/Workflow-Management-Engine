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
        public async Task AddAsync(Workflow workflow)
        {
            await _dbContext.Workflows.AddAsync(workflow);
            await _dbContext.SaveChangesAsync();
        }

        public async Task<List<Workflow>> GetAllAsync()
        {
            return await _dbContext.Workflows.ToListAsync();
        }

        public async Task<Workflow?> GetByIdAsync(Guid id)
        {
            return await _dbContext.Workflows.FindAsync(id);
        }

        public async Task<Workflow?> GetLatestByNameAsync(string name) =>
              await _dbContext.Workflows
                      .Where(w => w.Name == name)
                      .OrderByDescending(w => w.Version)
                      .FirstOrDefaultAsync();
    }
}
