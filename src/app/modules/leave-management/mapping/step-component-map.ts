import { Type } from '@angular/core';
import { StartStep } from '../start-step/start-step';
import { ManagerApproval } from '../manager-approval/manager-approval';
import { HrApproval } from '../hr-approval/hr-approval';
import { DefaultStep } from '../default-step/default-step';

export const STEP_COMPONENT_MAP: Record<string, Type<any>> = {
  'Elsa.Start': StartStep,
  'FlowNode1': ManagerApproval,
  'Elsa.FlowNode': DefaultStep,
  'Elsa.FlowDecision': DefaultStep,
  'Manager approval step': ManagerApproval,
  'ManagerApproval': ManagerApproval,
  'Humman resource approval': HrApproval,
  'Human resource approved': HrApproval,
  'HRApproval': HrApproval,
  'Elsa.Event': DefaultStep, // generic fallback for event-based steps
};