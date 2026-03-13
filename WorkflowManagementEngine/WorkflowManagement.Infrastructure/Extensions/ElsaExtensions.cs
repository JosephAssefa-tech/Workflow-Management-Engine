using Elsa.Extensions;
using Microsoft.Extensions.DependencyInjection;

namespace WorkflowManagement.Infrastructure.Extensions;

public static class ElsaExtensions
{
    public static IServiceCollection AddElsaInfrastructure(
        this IServiceCollection services,
        string connectionString)
    {
        services.AddElsa(elsa =>
        {
            //elsa.UseEntityFrameworkPersistence(ef =>
                //ef.UseSqlServer(connectionString));
        });

        return services;
    }
}