import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class WorkflowStateService {
  private data: any = {};

  set(key: string, value: any) {
    this.data[key] = value;
  }

  get(key: string): any {
    return this.data[key];
  }

  setData(value: any) {
    this.data = { ...this.data, ...value };
  }

  getData() {
    return this.data;
  }
}