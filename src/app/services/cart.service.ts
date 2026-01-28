import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // Hafizada Tutulan Urunler
  private items: any[] = [];

  constructor() {
    // Hafizadan Verileri Yukle
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.items = JSON.parse(savedCart);
    }
  }

  // Urun Ekle
  addToCart(product: any) {
    this.items.push(product);
    this.saveCart(); // Her degisiklikte hafizaya kaydet
  }

  // Urunleri Getir
  getItems() {
    return this.items;
  }

  // Tum Urunleri Temizle
  clearCart() {
    this.items = [];
    this.saveCart();
    return this.items;
  }

  // Urun Sil (Sepetten cikar)
  removeItem(product: any) {
    const index = this.items.indexOf(product);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
    }
  }

  // Toplam Fiyati Hesapla
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  // Hafizaya Kaydet
  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.items));
  }
}
