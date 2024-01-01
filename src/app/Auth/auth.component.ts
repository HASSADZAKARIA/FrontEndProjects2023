import { Component } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.authService.logIn(this.username, this.password)) {
      this.router.navigateByUrl('home');
    } else {
      console.log('User not found');
      this.error = "Nom d'utilisateur ou mot de passe incorrect.";
    }
  }
}
