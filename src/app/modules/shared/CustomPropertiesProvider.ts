import { is } from 'bpmn-js/lib/util/ModelUtil';

export default class CustomPropertiesProvider {
    propertiesPanel: any;
  translate: any;
  modeling: any;
  moddle: any;
  constructor(propertiesPanel: any, translate: any, modeling: any, moddle: any) {
    this.propertiesPanel = propertiesPanel;
    this.translate = translate;
    this.modeling = modeling;
    this.moddle = moddle;
  }

  getGroups(element: any) {
    const groups = [];

    if (is(element, 'bpmn:UserTask')) {
      groups.push({
        id: 'workflow-step',
        label: 'Workflow Step Config',
        entries: [
          {
            id: 'stepType',
            description: 'Business Step Type',
            html: `<input type="text" name="stepType" />`,
            get: el => ({ stepType: getProp(el, 'stepType') }),
            set: (el, val) => setProp(el, 'stepType', val.stepType, this.modeling, this.moddle)
          },
          {
            id: 'label',
            html: `<input type="text" name="label" />`,
            get: el => ({ label: getProp(el, 'label') }),
            set: (el, val) => setProp(el, 'label', val.label, this.modeling, this.moddle)
          },
          {
            id: 'icon',
            html: `<input type="text" name="icon" />`,
            get: el => ({ icon: getProp(el, 'icon') }),
            set: (el, val) => setProp(el, 'icon', val.icon, this.modeling, this.moddle)
          },
          {
            id: 'order',
            html: `<input type="number" name="order" />`,
            get: el => ({ order: getProp(el, 'order') }),
            set: (el, val) => setProp(el, 'order', val.order, this.modeling, this.moddle)
          }
        ]
      });
    }

    return groups;
  }
}

// ------------------- Helper functions -------------------
function getExtension(element: any) {
  return element.businessObject.extensionElements;
}

function getProp(element: any, name: string) {
  const ext = getExtension(element);
  if (!ext) return '';
  const properties = ext.values?.find(v => v.$type === 'camunda:Properties');
  if (!properties) return '';
  const prop = properties.values.find(p => p.name === name);
  return prop ? prop.value : '';
}

function setProp(element: any, name: string, value: any, modeling: any, moddle: any) {
  let extensionElements = element.businessObject.extensionElements;
  if (!extensionElements) {
    extensionElements = moddle.create('bpmn:ExtensionElements', { values: [] });
  }

  let properties = extensionElements.values.find(v => v.$type === 'camunda:Properties');
  if (!properties) {
    properties = moddle.create('camunda:Properties', { values: [] });
    extensionElements.values.push(properties);
  }

  let prop = properties.values.find(p => p.name === name);
  if (!prop) {
    prop = moddle.create('camunda:Property', { name, value });
    properties.values.push(prop);
  } else {
    prop.value = value;
  }

  modeling.updateProperties(element, { extensionElements });
  return {};
}