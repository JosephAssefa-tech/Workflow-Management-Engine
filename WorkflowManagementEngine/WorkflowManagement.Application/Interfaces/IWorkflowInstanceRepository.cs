using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Elsa.Models;


namespace WorkflowManagement.Application.Interfaces
{
    public  interface  IWorkflowInstanceRepository
    {
        //  Task<List<WorkflowInstance>> GetAllAsync();
        Task<IEnumerable<WorkflowInstance>> GetAllInstancesAsync();
        Task<WorkflowInstance?> GetByIdAsync(string id);
    }
}
