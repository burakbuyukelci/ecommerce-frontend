import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishListService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {

  items: any[] = [];

  constructor(private wishlistService: WishListService) {}

  ngOnInit() {
    this.loadWishlist();
  }

  loadWishlist() {
    // WishList Servisinden Urunleri Cek
    this.items = this.wishlistService.getItems();
  }

  removeItem(item: any) {
    this.wishlistService.removeItem(item);
    this.loadWishlist(); // Listeyi Guncelle
  }
}
