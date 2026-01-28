import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { ProductService } from '../../services/product.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {

  totalPrice: number = 0;
  items: any[] = [];

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private productService: ProductService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // Sepet Bilgilerini Al
    this.items = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotalPrice();

    // Sepet bos ise anasayfaya don
    if (this.items.length === 0) {
      this.router.navigate(['/']);
    }
  }

  makePayment() {
    // Kullanici Bilgilerini Al

    const user = this.authService.getUser();

    // 1. Stok Dusme
    this.items.forEach(item => {
      this.productService.updateStock(item.id, 1).subscribe({
        error: (err) => console.error("Stok hatası", err)
      });
    });

    // 2. Siparis Olusturma
    const productNames = this.items.map(i => i.name).join(", ");
    const orderData = {
      customerName: user.name,
      productList: productNames,
      totalPrice: this.totalPrice
    };

    this.http.post('http://localhost:8080/api/orders/create', orderData).subscribe({
      next: (res) => {
        alert("🎉 Ödeme Başarılı! Siparişiniz alındı.");
        this.cartService.clearCart();
        this.router.navigate(['/']);
      },
      error: (err) => alert("Sipariş hatası!")
    });
  }
}
