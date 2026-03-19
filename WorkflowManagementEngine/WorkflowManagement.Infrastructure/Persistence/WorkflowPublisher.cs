

using System.Text.Json;
using Elsa.Models;
using Elsa.Persistence;
using WorkflowManagement.Application.Interfaces;


public class ElsaWorkflowPublisher : IWorkflowPublisher
{
    private readonly IWorkflowDefinitionStore _definitionStore;

    public ElsaWorkflowPublisher(IWorkflowDefinitionStore definitionStore)
    {
        _definitionStore = definitionStore;
    }

    public async Task<string> PublishAsync(string workflowJson)
    {
        
        var definition = JsonSerializer.Deserialize<WorkflowDefinition>(workflowJson);

        if (definition == null)
            throw new Exception("Invalid workflow JSON");

        
        definition.Id = Guid.NewGuid().ToString();
        definition.Version = 1;
        definition.IsPublished = true;

       
        await _definitionStore.SaveAsync(definition);

        
        return definition.DefinitionId;
    }
}