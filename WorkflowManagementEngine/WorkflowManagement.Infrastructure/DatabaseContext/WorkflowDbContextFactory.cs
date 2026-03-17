using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace WorkflowManagement.Infrastructure.DatabaseContext
{
    public class WorkflowDbContextFactory : IDesignTimeDbContextFactory<WorkflowDbContext>
    {

                  public WorkflowDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<WorkflowDbContext>();

            // Use the same connection string as your appsettings.json
            optionsBuilder.UseSqlServer(
                "Data Source=localhost\\MSSQLSERVER2022;Initial Catalog=WorkflowEngine;TrustServerCertificate=true;Trusted_Connection=true;Integrated Security=True;Connection Timeout=3600"
            );

            return new WorkflowDbContext(optionsBuilder.Options);
        }
    
    }
}
