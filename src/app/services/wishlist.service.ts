import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  // Hafizada Tutulan Urunler
  private items: any[] = [];

  constructor() {
    // Hafizadan Verileri Yukle
    const savedWishList = localStorage.getItem('WishList');
    if (savedWishList) {
      this.items = JSON.parse(savedWishList);
    }
  }

  // Urun Ekle
  addToWishList(product: any) {
    this.items.push(product);
    this.saveWishList(); // Her degisiklikte hafizaya kaydet
  }

  // Urunleri Getir
  getItems() {
    return this.items;
  }

  // Tum Urunleri Temizle
  clearWishList() {
    this.items = [];
    this.saveWishList();
    return this.items;
  }

  // Urun Sil
  removeItem(product: any) {
    const index = this.items.indexOf(product);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveWishList();
    }
  }

  // Toplam Fiyat Hesapla
  getTotalPrice() {
    return this.items.reduce((total, item) => total + item.price, 0);
  }

  // Hafizaya Kaydet
  private saveWishList() {
    localStorage.setItem('WishList', JSON.stringify(this.items));
  }
}
