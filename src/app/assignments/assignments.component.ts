import { Component, OnInit } from '@angular/core';
import { Assignment } from './assignment.model';
import { AssignmentsService } from '../shared/assignments.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
  initializationMessage: string = '';
  titre = 'Mon application sur les assignments';
  ajoutActive = false;
  nomDevoir = '';
  dateRendu!: Date;
  assignementSelectionne!: Assignment;
  formVisible = false;
  assignments!:Assignment[];

  constructor(private assignmentsService:AssignmentsService) {}
  onSubmit() {
    console.log(this.nomDevoir + ' Date de rendu =' + this.dateRendu);
    const newAssignment = new Assignment();
    newAssignment.nom = this.nomDevoir;
    newAssignment.dateDeRendu = this.dateRendu?this.dateRendu:new Date();
    newAssignment.rendu = false;
    this.assignments.push(newAssignment);
  }

  ngOnInit(): void {
    
    setTimeout(() => {
      this.ajoutActive = true;
    }, 2000);

    this.assignmentsService.getAssignments().subscribe(assignments=>this.assignments=assignments);
  }

  onAssignmentClicke(assignment: Assignment) {
    this.assignementSelectionne = assignment;
    console.log(assignment);
  }

  onAddAssignmentBtnClick() {}

  

  
}
  