import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Giris yapmis, sayfaya erisebilir
    } else {
      alert("Bu sayfayı görmek için giriş yapmalısınız!");
      this.router.navigate(['/login']); // Giris yapmamis, login'e git
      return false;
    }
  }
}
