import { Component,OnInit } from '@angular/core';
import { MyServiceService } from '../my-service.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent {

  username: string = '';  // Define model for username
  password: string = '';  // Define model for password

  constructor(private objservice:MyServiceService, private router: Router) { }
  LoginUser() {
    this.objservice.getUserId(this.username, this.password).subscribe(
      (userId) => {
        console.log('User ID:', userId);
        this.objservice.setUserId(userId); // Store the UserID globally
        if (userId > 0) {
          this.router.navigate(['/all-books']);  // Navigate to the all-books component
        } else {
          alert('Login failed. Invalid username or password.'); 
        }
      },
      (error) => {
        console.error('Login failed', error);
        alert('Login failed. Please try again later.'); 
      }
    );
}
}
