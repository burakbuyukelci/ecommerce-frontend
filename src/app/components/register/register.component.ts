import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  // Kullanici Modeli
  user = {
    name: '',
    email: '',
    password: '',
    role: 'USER' // Varsayilan rol USER
  };

  constructor(private authService: AuthService) {}

  // Kullanici Kayit Fonksiyonu
  register() {
    this.authService.register(this.user).subscribe({
      next: (response) => {
        alert("Kayıt Başarılı! Hoş geldin " + response.name);
      },
      error: (error) => {
        console.error(error);
        alert("Kayıt olurken hata oluştu!");
      }
    });
  }
}
