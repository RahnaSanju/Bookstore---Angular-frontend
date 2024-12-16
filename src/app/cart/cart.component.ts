import { Component,OnInit,Input } from '@angular/core';
import { MyServiceService,Cart_Tab } from '../my-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  getData:Cart_Tab[]=[];

  //userId: number = 1;
  userId: number | null = null;

  constructor(private objservice:MyServiceService, private router: Router) { }
  ngOnInit(): void {
        // Subscribe to the UserID observable to get the latest value
        this.objservice.userId$.subscribe((userId) => {
          this.userId = userId;
          //console.log('Global User ID:', this.userId);
          if (this.userId) {
            this.getCart();  // Call getCart() once the UserID is available
          }
        });
    //this.getCart();
  }
  // getCart(): void {
  //   this.objservice.ViewCart(this.userId).subscribe((resp: any) => {
  //     this.getData = resp;
  //     console.log('Data Length:', this.getData.length);
  //     //console.log('Book Data:', this.getData);
  //   });
  getCart(): void { debugger;
    if (this.userId) {
      this.objservice.ViewCart(this.userId).subscribe((resp: any) => {
        this.getData = resp;
        console.log('Data Length:', this.getData.length);
      });
    } else {
      console.error('User ID is not available');
    }
  }

  // updateCart():void {
  //   this.objservice.UpdateCart(this.userId,this.bookid,this.qty).subscribe((result)=>{
  //     this.router.navigate(['/selectall/']);
  //   }, (err)=>{
  //     console.log(err);
  //   });
  //   }

    updateCart(User_Id: number, Book_Id: number, Qty: number) {
      if (!Qty || Qty < 1) {
        alert('Please enter a valid quantity.');
        return;
      }
  
      this.objservice.UpdateCart(User_Id, Book_Id, Qty).subscribe(
        response => {
          alert('Book updated to cart successfully!');
          console.log('Response:', response);
        },
        error => {
          alert('Failed to update book to cart.');
          console.error('Error:', error);
        }
      );
    }

      deleteCart(User_Id:number,Book_Id:number):void{
        this.objservice.DeleteCart(User_Id,Book_Id)
        .subscribe(() => {
          this.getCart();
        },(err)=>{
        console.log(err);
        }
        );
      }
}