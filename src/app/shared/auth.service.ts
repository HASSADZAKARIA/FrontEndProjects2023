import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public users = [
    { username: 'ZAKARIA', password: 'ZAKARIA', role: 'user' },
    { username: 'Azakaria', password: 'ZAKARIA', role: 'admin' },
    { username: 'Alice', password: 'password123', role: 'user' },
    { username: 'Bob', password: 'securePassword', role: 'user' },
    { username: 'Charlie', password: 'strongPassword', role: 'user' },
  ];

  loggedIn = false;
  currentUser: any;

  logIn(username: string, password: string) {
    const user = this.users.find(u => u.username === username && u.password === password);
    if (user) {
      this.loggedIn = true;
      this.currentUser = user;
      return true;
    }
    return false;
  }

  logOut() {
    this.loggedIn = false;
    this.currentUser = null; // Réinitialisez également l'utilisateur courant
  }

  isLogged(): boolean {
    return this.loggedIn;
  }

  isAdmin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.currentUser && this.currentUser.role === 'admin') {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

  constructor() {
    this.loggedIn = false;
  }
}