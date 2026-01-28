import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }


  // 1. Kullaniciyi tarayici hafizasina kaydet
  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // 2. Hafizadan kullaniciyi getir
  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  // 3. Su an giris yapmis biri var mi?
  isLoggedIn(): boolean {
    return localStorage.getItem('user') !== null;
  }

  // 4. Giris yapan kisi ADMIN mi?
  isAdmin(): boolean {
    const user = this.getUser();
    return user && user.role === 'ADMIN';
  }

  // 5. Cikis Yap (Logout)
  logout() {
    localStorage.removeItem('user');
  }
  // Tum kullanicilari getir
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  // Kullanici sil
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`, { responseType: 'text' });
  }
}
