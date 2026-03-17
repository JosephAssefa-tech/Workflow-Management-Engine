using System.Text.Json;
using Elsa.Models;
using Elsa.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using WorkflowManagement.Application.DTOs;
using WorkflowManagement.Application.Services;
using WorkflowManagementEngine.Api.Hubs;

namespace WorkflowManagementEngine.Api.Controllers.Workflows
{
    [ApiController]
    [Route("/workflows")]
    public class WorkflowController : Controller
    {
        private readonly WorkflowService _workflowService;
        private readonly IWorkflowPublisher _publisher;
        private readonly IStartsWorkflow _starter;
        private readonly IHubContext<WorkflowHub> _hub;
        public WorkflowController(IHubContext<WorkflowHub> hub, IWorkflowPublisher publisher,
            WorkflowService workflowService,
        IStartsWorkflow starter)
        {
            _hub = hub;
            _publisher = publisher;
            _starter = starter;
            _workflowService = workflowService;

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
        //[HttpPost("publish")]
        //public async Task<IActionResult> PublishWorkflow([FromBody] WorkflowDto dto)
        //{
        //    var converter = new BpmnToElsaConverter();
        //    var elsaDefinition = converter.Convert(dto.Xml);

        //var workflowDefinition = new WorkflowDefinition
        //{
        //    DefinitionId = Guid.NewGuid().ToString(),
        //    Name = dto.Name,
        //    IsPublished = true
        //};

        //var model = new WorkflowDefinitionModel
        //{
        //    DefinitionId = workflowDefinition.DefinitionId,
        //    Name = workflowDefinition.Name,
        //    IsPublished = true,
        //    Activities = ((dynamic)elsaDefinition).activities,
        //    Connections = ((dynamic)elsaDefinition).connections
        //};

        //   await _publisher.PublishAsync(model);

        //  return Ok();work
        //}
        [HttpPost("publish")]
        public async Task<IActionResult> PublishWorkflow([FromBody] WorkflowPublishDto dto)
        {
            var result = await _workflowService.PublishAsync(dto);
            return Ok(result);
        }

        [HttpPost("start/{definitionId}")]
        public async Task<IActionResult> StartWorkflow(string definitionId)
        {
            //var result = await _starter.StartWorkflowAsync(definitionId);

            //return Ok(new
            //{
            //    InstanceId = result.WorkflowInstance.Id
            //});
            return Ok();
        }

    }
}
