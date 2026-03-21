using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml.Linq;
using AutoMapper;
using Elsa.Services;
using WorkflowManagement.Application.DTOs;
using WorkflowManagement.Application.Interfaces;
using WorkflowManagement.Domain.Entities.WorkflowDefinations;

namespace WorkflowManagement.Application.Services
{
    public class WorkflowService
    {
        private readonly IMapper _mapper;
        private readonly Elsa.Services.IWorkflowPublisher _publisher;
        private readonly IWorkflowRepository _repository;
        public WorkflowService(IMapper mapper, Elsa.Services.IWorkflowPublisher publisher, IWorkflowRepository repository)
        {
            _mapper = mapper;
            _publisher = publisher;
            _repository = repository;
        }

        //public async Task<WorkflowDto> PublishAsync(WorkflowPublishDto dto)
        //{

        //    var workflowEntity = _mapper.Map<Workflow>(dto);
        //    workflowEntity.Id = Guid.NewGuid();
        //    workflowEntity.Version += 1;
        //    var converter = new BpmnToElsaConverter();
        //    var elsaDefinition = converter.Convert(dto.Xml);

        //    workflowEntity.ElsaJson = JsonSerializer.Serialize(elsaDefinition);

        //  await _repository.AddAsync(workflowEntity);

        //    var elsaWorkflow = new Elsa.Models.WorkflowDefinition
        //    {
        //        Name = workflowEntity.Name,
        //        IsPublished = workflowEntity.IsPublished,
        //      //  Activities = ((dynamic)elsaDefinition).activities,
        //      //  Connections = ((dynamic)elsaDefinition).connections

        //    };

        //    // 4️⃣ Publish workflow in Elsa
        //    await _publisher.PublishAsync(elsaWorkflow);

        //    return _mapper.Map<WorkflowDto>(workflowEntity);
        //}

        public async Task<WorkflowDto> PublishAsync(WorkflowPublishDto dto)
        {
            var workflowEntity = _mapper.Map<Workflow>(dto);
            workflowEntity.Id = Guid.NewGuid();
            workflowEntity.Version += 1;

            // Extract BPMN Process ID
            XDocument doc = XDocument.Parse(dto.Xml);
            XNamespace bpmn = "http://www.omg.org/spec/BPMN/20100524/MODEL";
            var processElement = doc.Descendants(bpmn + "process").FirstOrDefault();
            workflowEntity.BpmnProcessId = processElement?.Attribute("id")?.Value ?? Guid.NewGuid().ToString();

            // 2️⃣ Convert XML to Elsa definition
            var converter = new BpmnToElsaConverter();
            var elsaDefinition = converter.Convert(dto.Xml);

            workflowEntity.ElsaJson = JsonSerializer.Serialize(elsaDefinition);

            await _repository.AddAsync(workflowEntity);

            var tasks = converter.ExtractTasks(dto.Xml)
                                 .Select(t => new WorkflowTask
                                 {
                                     Id = Guid.NewGuid(),
                                     WorkflowId = workflowEntity.Id,
                                     BpmnTaskId = t.Id,
                                     Name = t.Name
                                 }).ToList();

            if (tasks.Any())
            {
                await _repository.AddTasksAsync(tasks); 
            }

            // 5️⃣ Prepare Elsa workflow and publish
            var elsaWorkflow = new Elsa.Models.WorkflowDefinition
            {
                Name = workflowEntity.Name,
                IsPublished = workflowEntity.IsPublished
                // Activities & connections are already inside ElsaJson
            };

            await _publisher.PublishAsync(elsaWorkflow);

            return _mapper.Map<WorkflowDto>(workflowEntity);
        }
    }
}
