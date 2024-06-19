// Importações necessárias para o módulo de roteamento
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';

// Declaração das rotas da aplicação
const routes: Routes = [
  {
    path:'',
    redirectTo: 'home',  // Rota para o componente Home
    pathMatch: 'full'
  },
  {
    path:'home',
    component: HomeComponent  // Rota para o componente Home
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  // Importa o módulo de roteamento configurado
  exports: [RouterModule] // Exporta o módulo de roteamento
})
export class AppRoutingModule { }
