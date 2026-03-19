using Elsa.Persistence.EntityFramework.Core.Extensions;
using Elsa.Persistence.EntityFramework.SqlServer;
using WorkflowManagement.Application.Interfaces;
using WorkflowManagement.Application.MappingProfiles;
using WorkflowManagement.Application.Services;
using WorkflowManagement.Infrastructure.DatabaseContext;
using WorkflowManagement.Infrastructure.Persistence;
using WorkflowManagementEngine.Api.Hubs;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddAutoMapper(typeof(WorkflowProfile));
builder.Services.AddSignalR();
builder.Services.AddScoped<WorkflowService>();
builder.Services.AddScoped<WorkflowInstanceService>();
builder.Services.AddScoped<IWorkflowInstanceRepository, WorkflowInstanceRepository>();

//builder.Services.AddScoped<IWorkflowPublisher, WorkflowPublisher>();

builder.Services.AddScoped<IWorkflowRepository, WorkflowRepository>();
builder.Services.AddDbContext<WorkflowDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

var connectionString = builder.Configuration.GetConnectionString("Default");

builder.Services.AddElsa(elsa =>
{
    elsa.UseEntityFrameworkPersistence(ef => ef.UseSqlServer(connectionString));
    elsa.AddConsoleActivities();
    elsa.AddHttpActivities();

});
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
    {
        policy.WithOrigins("http://localhost:4200")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); 
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "My API",
        Version = "v1"
    });
});


var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = "swagger";
    });
}
app.UseRouting();
app.UseCors("AllowAngular");
app.UseAuthorization();
app.MapControllers();
app.MapHub<WorkflowHub>("/workflowHub");
app.Run();