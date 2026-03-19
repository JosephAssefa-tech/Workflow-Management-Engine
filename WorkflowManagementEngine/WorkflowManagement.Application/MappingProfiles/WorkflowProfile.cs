using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using WorkflowManagement.Application.DTOs;
using WorkflowManagement.Domain.Entities.WorkflowDefinations;

namespace WorkflowManagement.Application.MappingProfiles
{
    public class WorkflowProfile : Profile
    {
        public WorkflowProfile()
        {
            CreateMap<WorkflowPublishDto, Workflow>()
    .ForMember(dest => dest.ElsaJson, opt => opt.Ignore()); 

            CreateMap<Workflow, WorkflowDto>();
        }

    }
}
