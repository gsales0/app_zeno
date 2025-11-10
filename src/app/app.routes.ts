import { Routes } from '@angular/router';
import { LoginComponent } from './modulo01/login/login.component';
import { MenubarComponent } from './modulo01/menubar/menubar.component';

export const routes: Routes = [
    {path: ':alias/login', component: LoginComponent},
    {path: ':alias/menu', component: MenubarComponent}
];
