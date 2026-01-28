import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Urun Arayuzu
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Backend API adresi
  private apiUrl = 'http://localhost:8080/api/products';

  // HttpClient'i Enjekte Et
  constructor(private http: HttpClient) { }

  // Tum urunleri getirme metodu (GET istegi)
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  // Urun Ekleme Metodu (POST istegi)
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
  // Urun Guncelleme Metodu (PUT istegi)
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }
  // Urun Silme Metodu (DELETE istegi)
  deleteProduct(id: number): Observable<void> {
    // Backend'deki @DeleteMapping("/{id}") adresine istek atar
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  // Stok Guncelleme Metodu (PUT istegi)
  updateStock(id: number, quantity: number): Observable<any> {
    // Backend'deki @PutMapping("/{id}/stock") adresine istek atar
    return this.http.put(`${this.apiUrl}/${id}/stock?quantity=${quantity}`, {});
  }
  // Urun Arama Metodu (GET istegi)
  searchProducts(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?name=${keyword}`);
  }
}
