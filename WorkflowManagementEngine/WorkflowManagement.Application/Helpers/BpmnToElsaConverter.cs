using System.Xml.Linq;

//public class BpmnToElsaConverter
//{
//    public object Convert(string xml)
//    {
//        var doc = XDocument.Parse(xml);

//        XNamespace bpmn = "http://www.omg.org/spec/BPMN/20100524/MODEL";

//        var activities = new List<object>();
//        var connections = new List<object>();

//        // Start Event
//        var startEvent = doc.Descendants(bpmn + "startEvent").FirstOrDefault();
//        if (startEvent != null)
//        {
//            activities.Add(new
//            {
//                id = startEvent.Attribute("id")?.Value,
//                type = "Start"
//            });
//        }

//        // User Tasks → WriteLine (example mapping)
//        var tasks = doc.Descendants(bpmn + "userTask");
//        foreach (var task in tasks)
//        {
//            activities.Add(new
//            {
//                id = task.Attribute("id")?.Value,
//                type = "SignalReceived",
//                properties = new
//                {
//                    Signal = task.Attribute("name")?.Value
//                }
//            });
//        }

//        // Sequence Flows
//        var flows = doc.Descendants(bpmn + "sequenceFlow");
//        foreach (var flow in flows)
//        {
//            connections.Add(new
//            {
//                sourceActivityId = flow.Attribute("sourceRef")?.Value,
//                targetActivityId = flow.Attribute("targetRef")?.Value
//            });
//        }

//        return new
//        {
//            activities,
//            connections
//        };
//    }
//}

public class BpmnToElsaConverter
{
    public object Convert(string xml)
    {
        var doc = XDocument.Parse(xml);
        XNamespace bpmn = "http://www.omg.org/spec/BPMN/20100524/MODEL";

        var activities = new List<object>();
        var connections = new List<object>();

        // Start Event
        var startEvent = doc.Descendants(bpmn + "startEvent").FirstOrDefault();
        if (startEvent != null)
        {
            activities.Add(new
            {
                id = startEvent.Attribute("id")?.Value,
                type = "Start"
            });
        }

        // User Tasks → WriteLine (example mapping)
        var tasks = doc.Descendants(bpmn + "userTask");
        foreach (var task in tasks)
        {
            activities.Add(new
            {
                id = task.Attribute("id")?.Value,
                type = "SignalReceived",
                properties = new
                {
                    Signal = task.Attribute("name")?.Value
                }
            });
        }

        // Sequence Flows
        var flows = doc.Descendants(bpmn + "sequenceFlow");
        foreach (var flow in flows)
        {
            connections.Add(new
            {
                sourceActivityId = flow.Attribute("sourceRef")?.Value,
                targetActivityId = flow.Attribute("targetRef")?.Value
            });
        }

        return new
        {
            activities,
            connections
        };
    }

    public List<(string Id, string Name)> ExtractTasks(string xml)
    {
        var doc = XDocument.Parse(xml);
        XNamespace bpmn = "http://www.omg.org/spec/BPMN/20100524/MODEL";

        // Include all tasks: generic + specific
        var taskElements = doc.Descendants()
            .Where(x => x.Name == bpmn + "task"        // generic task
                     || x.Name == bpmn + "userTask"    
                     || x.Name == bpmn + "serviceTask" 
                     || x.Name == bpmn + "scriptTask"
                     || x.Name == bpmn + "manualTask"); 

        var tasks = taskElements
            .Select(t => (
                Id: t.Attribute("id")?.Value ?? Guid.NewGuid().ToString(),
                Name: t.Attribute("name")?.Value ?? "Unnamed Task"
            ))
            .ToList();

        return tasks;
    }
}