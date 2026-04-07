import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LeaveRequestService {
  private baseUrl = 'https://localhost:14658/elsa/api'; 

  constructor(private http: HttpClient) {}

  submitLeaveRequest(data: any): Observable<any> {
    console.log('Submitting leave request:', data);
    return this.http.post(`${this.baseUrl}/submit`, data);
  }

  getLeaveRequest(employeeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${employeeId}`);
  }

  // startWorkflow(payload: any): Observable<any> {
  //   // payload: { employeeName, days, leaveDate, reason }
  //   const body = {
  //     definitionId: 'bbdcdaa82f0d6315', // your leave workflow definitionId
  //     version: null, 
  //     input: payload
  //   };

  //   return this.http.post(`${this.baseUrl}/workflow-instances`, body);
  // }
  startWorkflow(payload: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/workflow-definitions/bbdcdaa82f0d6315/execute`, {
    input: payload
  });
}
}