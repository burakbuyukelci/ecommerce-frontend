import { WishListService } from './services/wishlist.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from './services/product.service';
import { RouterOutlet, RouterLink } from '@angular/router';
import { OrderService } from './services/order.service';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'frontend';
  products: Product[] = [];
  orders: any[] = [];
  users: any[] = [];

  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    stock: 0,
    imageUrl: ''
  };

  constructor(
    private productService: ProductService,
    public authService: AuthService,
    private cartService: CartService,
    private orderService: OrderService
    , private wishlistService: WishListService
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    if (this.authService.isAdmin()) {
      this.getOrders();
      this.getUsers(); //Admin ise kullanicilari da getir
    }

  }


  //Kullanicilari Cek
  getUsers() {
    this.authService.getAllUsers().subscribe({
      next: (data) => this.users = data,
      error: (err) => console.error("Kullanıcılar çekilemedi", err)
    });
  }

  //Kullanici Sil
  deleteUser(id: number) {
    if(confirm("Bu kullanıcıyı kalıcı olarak silmek/banlamak istiyor musunuz?")) {
      this.authService.deleteUser(id).subscribe(() => {
        alert("Kullanıcı silindi!");
        this.getUsers(); // Listeyi yenile
      });
    }
  }

  getOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
      },
      error: (err) => console.error("Siparişler çekilemedi", err)
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }

  addProduct() {
    this.productService.createProduct(this.newProduct).subscribe((savedProduct) => {
      console.log('Kaydedildi:', savedProduct);
      this.loadProducts();
      this.newProduct = { id: 0, name: '', description: '', price: 0, stock: 0, imageUrl: '' };
    });
  }

  deleteProduct(id: number) {
    if(confirm("Bu ürünü silmek istediğinize emin misiniz?")) {
      this.productService.deleteProduct(id).subscribe(() => {
        console.log("Ürün silindi!");
        this.loadProducts();
      });
    }
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

  addToCart(product: any) {
    this.cartService.addToCart(product);
    alert(product.name + " sepete eklendi!");
  }

  addToWishList(product: any) {
    this.wishlistService.addToWishList(product);
    alert(product.name + " favorilere eklendi!");
  }

  searchTerm: string = '';

  search() {
    if (this.searchTerm) {
      // Backend'de arama yap
      this.productService.searchProducts(this.searchTerm).subscribe(data => {
        this.products = data;
      });
    } else {
      // Arama terimi boşsa tüm ürünleri yükle
      this.loadProducts(); //Tüm ürünleri yeniden yükle
    }
  }
}
