import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { CartComponent } from './cart/cart.component';
import { LoginUserComponent } from './login-user/login-user.component';
//import { InsertCartComponent } from './insert-cart/insert-cart.component';

const routes: Routes = [

  { path: '', redirectTo: 'login-user', pathMatch: 'full' }, // Redirect default route to /login-user
  {path: 'login-user', component: LoginUserComponent},
  { path: 'all-books', component: AllBooksComponent }, // New path for AllBooks
  { path: 'view/:id', component: CartComponent },
  //{ path: 'addToCart/:id', component: InsertCartComponent }, // Use /addToCart/:id for dynamic routing
  { path: '**', redirectTo: 'all-books' } // Redirect any unmatched routes
];


// const routes: Routes = [
//   {path: '', component: AllBooksComponent},
//   {path: 'addToCart', component: InsertCartComponent}  
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
