import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.apiServer;
  currentUser = new User();
  private currentUserSubject = new BehaviorSubject<User>(this.currentUser);
  currentUserSubject$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  /*Post the email and pass for the login to the API, and get from API the response with
  the user and the JWT.
  save that user and JWT into localStorage and into a Subject (currentUserSubject)*/
  login(email: string, password: string){
    return this.http.post(this.url+"/User/login", {email, password}).pipe(
      map((response:any) => {
        const user = response;
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  //Just remove data from localStorage and from Subject
  logout(){
    localStorage.removeItem('user');
    this.currentUserSubject.next(null!);
  }

  isLogged(){
    const user: User = JSON.parse(localStorage.getItem('user')!);
    if(user) return true;
    return false;
  }

  setCurrentUser(user:User){
    this.currentUserSubject.next(user);
  }


  public get CurrentUserValue(){
    return this.currentUserSubject.value;
  }
}
