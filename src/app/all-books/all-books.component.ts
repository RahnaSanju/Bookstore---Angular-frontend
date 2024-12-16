import { Component,OnInit,Input } from '@angular/core';
import { MyServiceService,Book_Tab } from '../my-service.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css']
})

export class AllBooksComponent implements OnInit {
  
  getData:Book_Tab[]=[];
  userId: number | null = null;
  //userId: number = 1;

  title: string= '' ;
  author: string = '';
  price: number = 0;




  constructor(private objservice:MyServiceService, private router: Router) { }
  ngOnInit(): void {
    this.objservice.userId$.subscribe((userId) => {
      this.userId = userId;  // Store the userId
    });
    this.getBooks();
  }
  getBooks(): void {
    this.objservice.getAllBooks().subscribe((resp: any) => {
      this.getData = resp;
      //console.log('Data Length:', this.getData.length);
      //console.log('Book Data:', this.getData);
    });
  }
  

  srchBooks(title: string, author: string, price: number)
  {
    debugger;
      this.objservice.searchBooks(title,author,price).subscribe((resp: any) => {
        this.getData = resp;
        //console.log('Data Length:', this.getData.length);
        //console.log('Book Data:', this.getData);
      });
    }
  
  

  InsertCart(User_Id: number, Book_Id: number, Qty: number):void {
    if (this.userId != null) {
      
      if (!Qty || Qty < 1) {
        alert('Please enter a valid quantity.');
        return;
      }
  
      this.objservice.InsertCart(User_Id, Book_Id, Qty).subscribe(
        response => {
          alert('Book added to cart successfully!');
          console.log('Response:', response);
        },
        error => {
          alert('Failed to add book to cart.');
          console.error('Error:', error);
        }
      );
      
    }
    else {
      this.showAlert();
      //alert('Please log in to add items to the cart.');
    }
    
  
}
showAlert(): void {
  alert('Please log in to add items to the cart.');
}
}
