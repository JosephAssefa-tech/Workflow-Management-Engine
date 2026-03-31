import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';



export interface Workflow {
  id: string;
  name: string;
  lastModified: string;
}


@Component({
  selector: 'app-workflow-list',
  standalone: false,
  templateUrl: './workflow-list.html',
  styleUrl: './workflow-list.css',
})
export class WorkflowList {

  displayedColumns: string[] = ['name', 'lastModified', 'actions'];

  workflows: Workflow[] = [
    { id: '1', name: 'Employee Leave Approval', lastModified: '2026-03-10' },
    { id: '2', name: 'Purchase Request Workflow', lastModified: '2026-03-12' },
    { id: '3', name: 'Invoice Approval Process', lastModified: '2026-03-14' }
  ];

  dataSource = new MatTableDataSource(this.workflows);

  constructor(private router: Router, private http: HttpClient) {}

  editWorkflow(workflow: Workflow) {
    this.router.navigate(['/workflows/designer', workflow.id]);
  }

  createWorkflow() {
    this.router.navigate(['/workflows/designer/new']);
  }
    login() {
  this.http.post<any>(
    'https://localhost:14658/elsa/api/identity/login',
    {
      userName: 'admin',
      password: 'password'
    }
  ).subscribe(res => {
     console.log('Logged in, token saved', res.accessToken);
    localStorage.setItem('token', res.accessToken);
   
  });
}
}
