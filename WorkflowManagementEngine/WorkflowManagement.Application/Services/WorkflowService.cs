using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
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
        private readonly IWorkflowPublisher _publisher;
        private readonly IWorkflowRepository _repository;
        public WorkflowService(IMapper mapper, IWorkflowPublisher publisher, IWorkflowRepository repository)
        {
            _mapper = mapper;
            _publisher = publisher;
            _repository = repository;
        }

        public async Task<WorkflowDto> PublishAsync(WorkflowPublishDto dto)
        {
            // 1️⃣ Map DTO → domain entity
            var workflowEntity = _mapper.Map<WorkflowDefinition>(dto);

            // 2️⃣ Convert BPMN → Elsa JSON
            var converter = new BpmnToElsaConverter();
            var elsaDefinition = converter.Convert(dto.Xml);

            workflowEntity.ElsaJson = JsonSerializer.Serialize(elsaDefinition);

            await _repository.AddAsync(workflowEntity);

            var elsaWorkflow = new Elsa.Models.WorkflowDefinition
            {
                Name = workflowEntity.Name,
                IsPublished = workflowEntity.IsPublished,
                // Activities and Connections must come from converter if needed
                // Activities = ((dynamic)elsaDefinition).activities,
                // Connections = ((dynamic)elsaDefinition).connections
            };

            // 4️⃣ Publish workflow in Elsa
            await _publisher.PublishAsync(elsaWorkflow);

            // 5️⃣ Save your domain entity to DB if needed
            // await _dbContext.WorkflowDefinitions.AddAsync(workflowEntity);
            // await _dbContext.SaveChangesAsync();

            // 6️⃣ Return DTO
            return _mapper.Map<WorkflowDto>(workflowEntity);
        }
    }
}
