var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "My API",
        Version = "v1"
    });
});
builder.Services.AddElsa(elsa =>
{
    // Configure workflow management
    elsa.UseWorkflowManagement(management =>
        management.UseEntityFrameworkCore());

    // Configure workflow runtime
    elsa.UseWorkflowRuntime(runtime =>
        runtime.UseEntityFrameworkCore());

    // Enable API endpoints
    elsa.UseWorkflowsApi();

    // Enable real-time updates
    elsa.UseRealTimeWorkflows();
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

// Configure the HTTP request pipeline.

app.UseAuthorization();

app.MapControllers();

app.Run();
