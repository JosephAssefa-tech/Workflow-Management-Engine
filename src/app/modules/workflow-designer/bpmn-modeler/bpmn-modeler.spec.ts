import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BpmnModeler } from './bpmn-modeler';

describe('BpmnModeler', () => {
  let component: BpmnModeler;
  let fixture: ComponentFixture<BpmnModeler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BpmnModeler],
    }).compileComponents();

    fixture = TestBed.createComponent(BpmnModeler);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
