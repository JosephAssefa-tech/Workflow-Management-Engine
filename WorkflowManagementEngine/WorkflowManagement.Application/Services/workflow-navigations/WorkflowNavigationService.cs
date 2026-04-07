using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkflowManagement.Application.DTOs;
using WorkflowManagement.Application.Helpers;
using WorkflowManagement.Application.Interfaces;

namespace WorkflowManagement.Application.Services.workflow_navigations
{
    public class WorkflowNavigationService : IWorkflowNavigationService
    {
        private readonly IWorkflowRepository _repository;

        public WorkflowNavigationService(IWorkflowRepository repository)
        {
            _repository = repository;
        }
        public async Task<WorkflowNavigationDto> GetNextAndPreviousTasks(
     Guid workflowId,
     string currentTaskId,
     Dictionary<string, object>? inputData = null) // optional input for conditions
        {
            var connections = await _repository.GetConnectionsByWorkflowId(workflowId);

            // 1️⃣ Linear / Parallel (no conditions)
            if (inputData == null || !inputData.Any())
            {
                var nextMap = WorkflowNavigator.BuildNextMap(connections);
                var prevMap = WorkflowNavigator.BuildPrevMap(connections);

                var nextTasks = nextMap.ContainsKey(currentTaskId) ? nextMap[currentTaskId] : new List<string>();
                var prevTasks = prevMap.ContainsKey(currentTaskId) ? prevMap[currentTaskId] : new List<string>();

                return new WorkflowNavigationDto
                {
                    CurrentTaskId = currentTaskId,
                    NextTaskIds = nextTasks,
                    PreviousTaskIds = prevTasks
                };
            }

            // 2️⃣ Conditional flows
            var possibleConnections = connections
                .Where(c => c.SourceTaskId == currentTaskId);

            var nextTasksConditional = possibleConnections
                .Where(c => EvaluateCondition(c.Condition, inputData))
                .Select(c => c.TargetTaskId)
                .ToList();

            var prevMapConditional = WorkflowNavigator.BuildPrevMap(connections);
            var prevTasksConditional = prevMapConditional.ContainsKey(currentTaskId)
                ? prevMapConditional[currentTaskId]
                : new List<string>();

            return new WorkflowNavigationDto
            {
                CurrentTaskId = currentTaskId,
                NextTaskIds = nextTasksConditional,
                PreviousTaskIds = prevTasksConditional
            };
        }
        private bool EvaluateCondition(string? condition, Dictionary<string, object> data)
        {
            if (string.IsNullOrWhiteSpace(condition))
                return true;

            // Very simple example — improve as needed
            if (condition == "approved == true")
                return data.ContainsKey("approved") && (bool)data["approved"] == true;

            if (condition == "approved == false")
                return data.ContainsKey("approved") && (bool)data["approved"] == false;

            return false;
        }
    }
}
