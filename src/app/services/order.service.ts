import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor(private http: HttpClient) { }

  // Tum siparisleri getir (Admin icin)
  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }
  // Kullaniciya ozel siparisleri getir
  getUserOrders(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-orders?username=${username}`);
  }
}
