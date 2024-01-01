import { Component, Input, OnInit } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-assignment-detail',
  templateUrl: './assignment-detail.component.html',
  styleUrls: ['./assignment-detail.component.css'],
})
export class AssignmentDetailComponent implements OnInit {
 assignmentTransmis: Assignment;
  authService = inject(AuthService);

  constructor(
    private assignmentService: AssignmentsService,
    private route: ActivatedRoute,
    private router: Router,
   // private authService :AuthService,

  ) {}
  ngOnInit(): void {
    this.getAssignment();
    if (!this.authService.isAdmin() || !this.authService.isLogged()) {
      this.router.navigate(['/home']);
    }
  }

  onAssignmentRendu() {
    //this.assignmentSelectionne.rendu = true;
    if(this.assignmentTransmis){
     this.assignmentTransmis.rendu = true;
     this.assignmentService.updateAssignment(this.assignmentTransmis)
       .subscribe(reponse => {
       console.log("réponse du serveur detail : " + reponse.message);
       this.router.navigate(['/home']);
     })
    }
   
  }

  

  onDelete() {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/home']);
    }
    this.assignmentService
      .deleteAssignment(this.assignmentTransmis)
      .subscribe((reponse) => console.log("réponse du serveur detail : " +reponse.message));
    /*this.assignementTransmis = null;*/
    this.router.navigate(['/home']);
  }
  getAssignment() {
    const id = +this.route.snapshot.params['id'];
    this.assignmentService.getAssignment(id).subscribe((assignment) => (
      this.assignmentTransmis = assignment));
  }
  onClickEdit() {
    this.router.navigate(['/assignment', this.assignmentTransmis.id, 'edit'], {
      queryParams: { nom: this.assignmentTransmis.nom },
      fragment: 'editing',
    });
    this.route.queryParams.subscribe(params => console.log(params));
    this.route.fragment.subscribe(fragment => console.log(fragment));
  }
  isAdmin():boolean{
    return this.authService.loggedIn;
  }
}
