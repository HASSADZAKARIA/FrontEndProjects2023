import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Application de gestion des assignments !!!';
  opened=false;
  constructor (private authService:AuthService, private router:Router){}
  login() {
    if (!this.authService.isLogged()) {
      // Si l'utilisateur n'est pas connecté, connectez-le
      console.log("Vous êtes connecté");
    } else {
      // Si l'utilisateur est connecté, déconnectez-le
      this.authService.logOut();
      this.router.navigate(['/home']);
      console.log("Vous êtes déconnecté");
    }
  }
  }

  // Commentaire de test
