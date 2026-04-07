using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkflowManagement.Domain.Entities.WorkflowDefinations;

namespace WorkflowManagement.Application.Helpers
{
    public class WorkflowNavigator
    {
        public static Dictionary<string, List<string>> BuildNextMap(List<WorkflowConnection> connections)
        {
            return connections
                .GroupBy(c => c.SourceTaskId)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(x => x.TargetTaskId).ToList()
                );
        }

        public static Dictionary<string, List<string>> BuildPrevMap(List<WorkflowConnection> connections)
        {
            return connections
                .GroupBy(c => c.TargetTaskId)
                .ToDictionary(
                    g => g.Key,
                    g => g.Select(x => x.SourceTaskId).ToList()
                );
        }
    }
}
