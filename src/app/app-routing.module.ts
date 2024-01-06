import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/login/login.component';
import  {authGuard}  from './guards/auth.guard';

const routes: Routes = [
  {path: '', component:LoginComponent},
  {path: 'users', component:UsersComponent, runGuardsAndResolvers:'always', canActivate: [authGuard]},
  {path: 'home', component:HomepageComponent},
  //Register path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
