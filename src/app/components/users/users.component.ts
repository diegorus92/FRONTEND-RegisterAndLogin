import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users:any;

  constructor(private userService:UserService){}

  getUsers(){
    this.userService.getUsers().subscribe({
      next: response =>{
        console.log('Getting users...', response);
        this.users = response;
      },
      complete:() =>{
        console.log("Users get complete!");
      },
      error:error =>{
        console.log("Error during users get: ", error);
      }
    })
  }
}
