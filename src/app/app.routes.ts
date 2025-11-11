import { Routes } from '@angular/router';
import { LoginComponent } from './modulo01/login/login.component';
import { MenubarComponent } from './modulo01/menubar/menubar.component';
import { DashboardComponent } from './modulo01/dashboard/dashboard.component';
import { CredoresComponent } from './modulo02/credores/credores.component';

export const routes: Routes = [
    {path: ':alias/login', component: LoginComponent},
    {path: ':alias', component: MenubarComponent, children: [
        {path: 'dashboard', component: DashboardComponent},
        {path: 'credores', component: CredoresComponent}
    ]}
];
