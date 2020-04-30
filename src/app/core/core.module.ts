import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([])
  ],
  declarations: [
    BsNavbarComponent,
    HomeComponent,
    LoginComponent],
  exports: [
    BsNavbarComponent
  ]
})
export class CoreModule { }
