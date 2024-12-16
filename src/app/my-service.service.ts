import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BehaviorSubject } from 'rxjs'; //for login

export interface Book_Tab {
  book_Id: number;
  book_Name: string;
  book_Author: string;
  book_Price: number;
  book_Quantity: number;
}

export interface Cart_Tab {
  user_Id: number;
  book_Id: number;
  book_Name: string;
  qty: number;
}

export var UserID: number;

// export interface CartItem {
//   UserId: number;
//   BookId: number;
//   Quantity: number;
// }

//const endpoint = 'http://localhost:5115/BookAPI/';
const endpoint = 'http://localhost:5115/'

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  private apiAddtocartUrl: string = 'http://localhost:5115/CartAPI/AddToCart/'; 
  private apiUpdatecartUrl: string = 'http://localhost:5115/CartAPI/UpdateCart/';


  private userIdSubject = new BehaviorSubject<number | null>(null); // Holds the UserID
  userId$ = this.userIdSubject.asObservable(); // Exposes the UserID as an observable
  private apiLoginUrl: string = 'http://localhost:5115/LoginAPI/LoginUser/';



    constructor(private http: HttpClient) { }

    //********************************************************

    //getUserId while Logging in

      // getUserId(username:string, password : string): Observable<any> {
      //   const url = `${endpoint}LoginAPI/LoginUser//${username}/${password}`;
      //   return this.http.get<UserID>(url, {});
      // }

      // getUserId(username: string, password: string): Observable<number> {
      //   const url = `${endpoint}LoginAPI/LoginUser/${username}/${password}`;
      //   return this.http.get<number>(url);
      // }
      getUserId(username: string, password: string) {
        const url = `${this.apiLoginUrl}${username}/${password}`;
        return this.http.get<number>(url);
      }

      // Set UserID globally after successful login
      setUserId(userId: number) {
        this.userIdSubject.next(userId); // Updates the UserID
      }

      // Optionally, you can clear UserID (for example, during logout)
      clearUserId() {
        this.userIdSubject.next(null);
      }


//********************************************************

    // Get all books
    getAllBooks(): Observable<Book_Tab[]> { 
    return this.http.get<Book_Tab[]>(endpoint + 'BookAPI/GetAllBooks');
    }

//********************************************************

  // searchBooks(title:string,auth:string,price:number): Observable<Book_Tab[]> { 
  //   const url = `${endpoint}BookAPI/GetBooksSearch/${title}/${auth}/${price}`;
  //   return this.http.get<Book_Tab[]>(url,{});
  //   }

  searchBooks(title: string, auth: string, price: number): Observable<Book_Tab[]> {
    let url = `${endpoint}BookAPI/GetBooksSearch?`;  // Base URL with query string

    // Append parameters conditionally
    if (title) {
        url += `title=${title}&`;
    }
    if (auth) {
        url += `auth=${auth}&`;
    }
    if (price > 0) {
        url += `price=${price}&`;
    }

    // Remove the trailing "&" if any
    url = url.endsWith('&') ? url.slice(0, -1) : url;

    return this.http.get<Book_Tab[]>(url);
}

    

//********************************************************


    InsertCart(User_Id: number, Book_Id: number, Qty: number): Observable<any> {
      const cartData = { User_Id, Book_Id, Qty };
      return this.http.post<any>(this.apiAddtocartUrl, cartData); // Ensure you return an Observable
    }
    // InsertCart(cartdata:any): Observable<any> { //to insert into cart
    // return this.http.post(endpoint + 'AddToCart', cartdata);

    //********************************************************

    ViewCart(userid:number): Observable<Cart_Tab[]> {
      return this.http.get<Cart_Tab[]>(endpoint + 'CartAPI/GetCartWithUserId/' + userid);
    }

    //********************************************************

    UpdateCart(userid:number, bookid : number, qty : number): Observable<any> {
      const url = `${endpoint}CartAPI/UpdateCart/${userid}/${bookid}/${qty}`; // Add parameters in the URL
      //const url = `${endpoint}CartAPI/UpdateCart?userid=${userid}&bookid=${bookid}&qty=${qty}`; // Add parameters as query string
      return this.http.put<Cart_Tab>(url, {});
      //return this.http.put<Cart_Tab>(endpoint + 'CartAPI/UpdateCart/' + userid,bookid,qty);
    }

    DeleteCart(userid:number, bookid : number): Observable<any> {
      const url = `${endpoint}CartAPI/DeleteCart/${userid}/${bookid}`;
      return this.http.delete<Cart_Tab>(url, {});
    }

  



}




// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { ReturnStatement } from '@angular/compiler';

//   export interface Book_Tab{
//     Book_Id : number;
//     Book_Name:string;
//     Book_Author:string;
//     Book_Price:number;
//   }


// const endpoint = 'http://localhost:5115/'

// @Injectable({
//   providedIn: 'root'
// })
// export class MyServiceService {

//   constructor(private http: HttpClient) { }
//   InsertCart(cartdata:any): Observable<any> { //to insert into cart
//     return this.http.post(endpoint + 'AddToCart', cartdata);

//   }

//   getAllBooks(): Observable<any>{ //to get all books
//     return this.http.get<Book_Tab>(endpoint + 'GetAllBooks');
//   }


// }
