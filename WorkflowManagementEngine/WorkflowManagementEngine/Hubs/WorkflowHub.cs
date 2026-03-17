using Microsoft.AspNetCore.SignalR;

namespace WorkflowManagementEngine.Api.Hubs
{
    public class WorkflowHub : Hub
    {
        public async Task SendWorkflowUpdate(string workflowId, string message)
        {
            await Clients.All.SendAsync("WorkflowUpdate", workflowId, message);
        }
    }
}
