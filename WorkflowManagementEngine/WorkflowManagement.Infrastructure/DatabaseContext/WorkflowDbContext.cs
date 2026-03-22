
using Elsa.Models;
using Microsoft.EntityFrameworkCore;
using WorkflowManagement.Domain.Entities.WorkflowDefinations;

namespace WorkflowManagement.Infrastructure.DatabaseContext
{
    public class WorkflowDbContext : DbContext
    {
        public WorkflowDbContext(DbContextOptions<WorkflowDbContext> options)
    : base(options) { }
      //.  public DbSet<WorkflowInstance> WorkflowInstances { get; set; }

        public DbSet<Workflow> Workflows { get; set; }
        public DbSet<WorkflowTask> WorkflowTasks { get; set; }

        public DbSet<WorkflowConnection> WorkflowConnections { get; set; }

        
    }
}
