import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.credentials).subscribe({
      next: (user) => {
        // Kullanici bilgilerini kaydet
        this.authService.saveUser(user);

        alert("Giriş Başarılı! Hoş geldin " + user.name);
        this.router.navigate(['/']);
      },
      error: (err) => {
        alert("Giriş Başarısız! Email veya Şifre yanlış.");
      }
    });
  }
}
