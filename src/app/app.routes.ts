import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './guards/auth.guard';
import { PaymentComponent } from './components/payment/payment.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
  // Kullanici kayit ve giris sayfalari
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  // Alisveris sepeti sayfasi

  { path: 'cart',
    component: CartComponent,
   canActivate: [AuthGuard]},// Sadece giris yapan gorebilsin
   {
      path: 'payment',
      component: PaymentComponent,
      canActivate: [AuthGuard] // Sadece giris yapan gorebilsin
    },
    {
      path: 'my-orders',
      component: MyOrdersComponent,
      canActivate: [AuthGuard] // Sadece giris yapan gorebilsin
    },
    {
      path: 'wishlist',
      component: WishlistComponent,
      canActivate: [AuthGuard] // Sadece giris yapan gorebilsin
    }


];
