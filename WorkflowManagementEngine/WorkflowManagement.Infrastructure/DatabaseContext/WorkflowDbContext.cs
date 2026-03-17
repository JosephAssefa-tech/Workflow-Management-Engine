
using Microsoft.EntityFrameworkCore;
using WorkflowManagement.Domain.Entities.WorkflowDefinations;

namespace WorkflowManagement.Infrastructure.DatabaseContext
{
    public class WorkflowDbContext : DbContext
    {
        public WorkflowDbContext(DbContextOptions<WorkflowDbContext> options)
    : base(options) { }

        public DbSet<WorkflowDefinition> WorkflowDefinitions { get; set; }
    }
}
