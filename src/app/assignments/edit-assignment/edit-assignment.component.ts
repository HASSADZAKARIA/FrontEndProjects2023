import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { AuthService } from '../../shared/auth.service';

@Component({
 selector: 'app-edit-assignment',
 templateUrl: './edit-assignment.component.html',
 styleUrls: ['./edit-assignment.component.css'],
})
export class EditAssignmentComponent implements OnInit {
 assignment!: Assignment | undefined;
 nomAssignment!: string;
 dateDeRendu!: Date;

 constructor(
   private assignmentsService: AssignmentsService,
   private route: ActivatedRoute,
   private router: Router,
   private authService: AuthService,
 ) {}

 ngOnInit(): void {
   this.getAssignment();
   this.route.queryParams.subscribe(params =>{
    console.log("Query parameters");
    console.log(params);
   });
   this.route.fragment.subscribe(fragment =>{
    console.log("URL Fragment");
    console.log(fragment);
   });
   if (!this.authService.isAdmin()) {
    this.router.navigate(['/home']);
  }
 }

 getAssignment() {
  // on récupère l'id dans le snapshot passé par le routeur
  // le "+" force l'id de type string en "number"
  const id = +this.route.snapshot.params['id'];
 
  this.assignmentsService.getAssignment(id).subscribe((assignment) => {
    if (!assignment) return;
    this.assignment = assignment;
    // Pour pré-remplir le formulaire
    this.nomAssignment = assignment.nom;
    this.dateDeRendu = assignment.dateDeRendu;
  });
}
onSaveAssignment() {
  if (!this.assignment) return;

  // on récupère les valeurs dans le formulaire
  this.assignment.nom = this.nomAssignment;
  this.assignment.dateDeRendu = this.dateDeRendu;
  this.assignmentsService.updateAssignment(this.assignment)
     .subscribe(reponse => {
     console.log("réponse du serveur edit: " + reponse.message);
     this.router.navigate(['/home']);
   })

}




}
