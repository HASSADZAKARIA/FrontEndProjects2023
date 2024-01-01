import { Component, OnInit /*EventEmitter, Output */ } from '@angular/core';
import { Assignment } from '../assignment.model';
import { AssignmentsService } from '../../shared/assignments.service';
import { AuthService } from '../../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // @Output() nouvelAssignment = new EventEmitter<Assignment>();
  ajoutActive = true;
  nomDevoir = '';
  dateRendu!: Date;

  constructor(
    private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    console.log(this.nomDevoir + ' a rendre le ' + this.dateRendu);
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu ? this.dateRendu : new Date();
    newAssignment.rendu = false;
    this.assignmentsService.addAssignment(newAssignment).subscribe((reponse) => {
      console.log("reponse du serveur add" + reponse.message);
      this.router.navigate(['/home']);
  });
  }

  ngOnInit() {
    if (!this.authService.isAdmin() || !this.authService.isLogged()) {
      this.router.navigate(['/home']);
    }
  }
}
