import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ClientesComponent } from './components/clientes/clientes.component';
import { DirectivaComponent } from './components/directiva/directiva.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './components/home/home.component';



export const ROUTES: Routes = [
    { path: 'clientes', component: ClientesComponent },
    { path: 'directivas', component: DirectivaComponent },
    { path: 'clientes/formulario', component: FormComponent },
    { path: 'home', component: HomeComponent },
    { path: 'clientes/formulario/:id', component: FormComponent },
    { path: '', pathMatch:'full', redirectTo: 'home' },
    { path: '**', pathMatch:'full', redirectTo: 'home' }

];

