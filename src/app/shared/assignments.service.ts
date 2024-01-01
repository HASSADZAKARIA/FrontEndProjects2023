import { Injectable,OnInit } from '@angular/core';
import { Observable,catchError,map,of, tap } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  assignments:Assignment[] = [
    {
      id: 1,
      nom: 'TP1 Web Compenents à rendre',
      dateDeRendu: new Date('2023-09-22'),
      rendu: true,
    },
    {
      id: 2,
      nom: 'TP2 ANGULAR à rendre',
      dateDeRendu: new Date('2023-09-12'),
      rendu: true,
    },
    {
      id: 3,
      nom: 'TP3 IA Big Data à rendre',
      dateDeRendu: new Date('2023-07-02'),
      rendu: false,
    },
  ];

  private HttpOptions = {
    headers: new HttpHeaders({
   'Content-Type': 'application/json' 
  })
  };

  constructor(private loggingService:LoggingService, private http:HttpClient ) { }
  url = "http://localhost:8010/api/assignments";
  getAssignments():Observable<Assignment[]>{
    return this.http.get<Assignment[]>(this.url);
  }

  

  addAssignment(assignment:Assignment):Observable<any> {
    this.loggingService.log(assignment.nom, "ajouté !");
    return this.http.post<Assignment>(this.url, assignment, this.HttpOptions);
  }

  updateAssignment(assignment:Assignment):Observable<any> {
    return this.http.post<Assignment>(this.url, assignment);
  }

  

  deleteAssignment(assignment:Assignment) :Observable<any> {
    this.loggingService.log(assignment.nom, "supprimé !");
    return this.http.delete(this.url+"/"+assignment._id);
  }

  getAssignment(id: number): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.url+"/"+id)
      .pipe(
        map(a => {
          a.nom += "modifie dans un pipe";
          return a;
        }),
        tap(_  => console.log("tap: assignment avec id ="+ id+ "requete GET envoyée sur MongoDB cloud")),
        catchError(this.handleError<any>('### catchError: getAssignment by id avec id ='+ id))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); 
      console.log(operation +'a echoué' +error.message);
      return of(result as T);
    };
  }
  
}
