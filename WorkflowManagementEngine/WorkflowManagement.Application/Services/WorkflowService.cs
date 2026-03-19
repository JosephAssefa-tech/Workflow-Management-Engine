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
        private readonly Elsa.Services.IWorkflowPublisher _publisher;
        private readonly IWorkflowRepository _repository;
        public WorkflowService(IMapper mapper, Elsa.Services.IWorkflowPublisher publisher, IWorkflowRepository repository)
        {
            _mapper = mapper;
            _publisher = publisher;
            _repository = repository;
        }

        public async Task<WorkflowDto> PublishAsync(WorkflowPublishDto dto)
        {
            
            var workflowEntity = _mapper.Map<Workflow>(dto);          
            var converter = new BpmnToElsaConverter();
            var elsaDefinition = converter.Convert(dto.Xml);

            workflowEntity.ElsaJson = JsonSerializer.Serialize(elsaDefinition);

     //       await _repository.AddAsync(workflowEntity);

            var elsaWorkflow = new Elsa.Models.WorkflowDefinition
            {
                Name = workflowEntity.Name,
                IsPublished = workflowEntity.IsPublished,
              //  Activities = ((dynamic)elsaDefinition).activities,
              //  Connections = ((dynamic)elsaDefinition).connections

            };

            // 4️⃣ Publish workflow in Elsa
            await _publisher.PublishAsync(elsaWorkflow);
           
            return _mapper.Map<WorkflowDto>(workflowEntity);
        }
    }
}
