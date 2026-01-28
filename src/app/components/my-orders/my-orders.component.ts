import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent implements OnInit {

  orders: any[] = [];
  username: string = '';

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.getUser();

    if (user) {
      this.username = user.name;
      this.loadMyOrders();
    } else {
      // Kullanici giris yapmadiysa login sayfasina yonlendir
      this.router.navigate(['/login']);
    }
  }

  loadMyOrders() {
    this.orderService.getUserOrders(this.username).subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => console.error("Siparişler yüklenemedi", err)
    });
  }
}
