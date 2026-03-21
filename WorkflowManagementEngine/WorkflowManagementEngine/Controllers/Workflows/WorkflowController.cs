using System.Text.Json;
using Elsa.Models;
using Elsa.Persistence;
using Elsa.Persistence.Specifications;
using Elsa.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using WorkflowManagement.Application.DTOs;
using WorkflowManagement.Application.Services;
using WorkflowManagementEngine.Api.Hubs;
using Elsa.Persistence.Specifications;
using WorkflowManagement.Infrastructure.DatabaseContext;
using Microsoft.EntityFrameworkCore;

namespace WorkflowManagementEngine.Api.Controllers.Workflows
{
    [ApiController]
    [Route("/workflows")]
    public class WorkflowController : Controller
    {
        private readonly WorkflowInstanceService _serviceInstance;
        private readonly IWorkflowInstanceStore _workflowInstanceStore;
        private readonly WorkflowService _workflowService;
        private readonly IWorkflowPublisher _publisher;
        private readonly IStartsWorkflow _starter;
        private readonly IHubContext<WorkflowHub> _hub;
        private readonly IWorkflowRegistry _workflowRegistry;

        public WorkflowController(WorkflowInstanceService serviceInstance, IWorkflowInstanceStore workflowInstanceStore, IHubContext<WorkflowHub> hub, IWorkflowRegistry workflowRegistry, IWorkflowPublisher publisher,
            WorkflowService workflowService,

        IStartsWorkflow starter)
        {
            _hub = hub;
            _publisher = publisher;
            _starter = starter;
            _workflowService = workflowService;
            _workflowRegistry = workflowRegistry;
            _workflowInstanceStore=workflowInstanceStore;
            _serviceInstance = serviceInstance;

        }
        [HttpPost]
        public async Task<IActionResult> SaveWorkflow([FromBody] WorkflowDto dto)
        {
            var converter = new BpmnToElsaConverter();

            var elsaJson = converter.Convert(dto.Xml);

            var json = System.Text.Json.JsonSerializer.Serialize(elsaJson, new JsonSerializerOptions
            {
                WriteIndented = true
            });

            System.IO.File.WriteAllText("workflow.json", json);

            return Ok(elsaJson);
        }
       
        [HttpPost("save")]
        public async Task<IActionResult> PublishWorkflow([FromBody] WorkflowPublishDto dto)
        {
            var result = await _workflowService.PublishAsync(dto);
            return Ok(result);
        }

        [HttpPost("start/{definitionId}")]
        public async Task<IActionResult> StartWorkflow(string definitionId)
        {
            var blueprint = await _workflowRegistry.FindAsync(definitionId, VersionOptions.Published);

            if (blueprint == null)
                return NotFound($"Workflow with ID {definitionId} not found");

            var result = await _starter.StartWorkflowAsync(blueprint);

            return Ok(new
            {
                InstanceId = result.WorkflowInstance.Id
            });

        }

        [HttpGet("instances")]
        public async Task<IActionResult> GetInstances()
        {
            var instances = await _serviceInstance.GetAllInstancesAsync();
            return Ok(instances);
        }

        [HttpGet("instances/{id}")]
        public async Task<IActionResult> GetInstance(string id)
        {
            var instance = await _serviceInstance.GetInstanceAsync(id);
            if (instance == null) return NotFound();
            return Ok(instance);
        }
    }
}
